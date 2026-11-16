#!/usr/bin/env python3
"""
Fast Artist Release & Cover Art Fetcher
Retrieves the 3 newest releases and 2 top releases using Apple & Deezer APIs in <2 seconds.
Downloads 1000x1000 cover art and outputs structured JSON conforming to src/types/artist.ts.
"""

import sys
import os
import re
import json
import argparse
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[-\s]+', '-', text).strip('-')

def clean_title(title):
    # Remove redundant suffixes like " - Single", " - EP"
    title = re.sub(r'\s*-\s*(Single|EP)$', '', title, flags=re.I)
    return title.strip()

def download_image(url, target_path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
            if len(content) > 5000: # ensure it's a real image
                with open(target_path, 'wb') as f:
                    f.write(content)
                return True
    except Exception as e:
        sys.stderr.write(f"Warning: Failed to download {url}: {e}\n")
    return False

def fetch_itunes_albums(apple_id, artist_name):
    albums = []
    try:
        if apple_id:
            url = f"https://itunes.apple.com/lookup?id={apple_id}&entity=album&limit=50"
        else:
            url = f"https://itunes.apple.com/search?term={urllib.parse.quote(artist_name)}&entity=album&limit=50"
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode())
        
        for item in data.get('results', []):
            if item.get('wrapperType') == 'collection':
                title = clean_title(item.get('collectionName', ''))
                release_date = item.get('releaseDate', '')[:10]
                artwork = item.get('artworkUrl100', '').replace('100x100bb.jpg', '1000x1000bb.jpg')
                album_type = 'single' if 'single' in item.get('collectionName', '').lower() else ('ep' if 'ep' in item.get('collectionName', '').lower() else 'album')
                apple_url = item.get('collectionViewUrl', '')
                
                albums.append({
                    'raw_title': item.get('collectionName', ''),
                    'title': title,
                    'type': album_type,
                    'releaseDate': release_date,
                    'artwork': artwork,
                    'appleMusicUrl': apple_url,
                    'trackCount': item.get('trackCount', 1)
                })
    except Exception as e:
        sys.stderr.write(f"iTunes error: {e}\n")
    return albums

def fetch_deezer_data(artist_name):
    deezer_albums = {}
    top_titles = set()
    try:
        url = f"https://api.deezer.com/search/artist?q={urllib.parse.quote(artist_name)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
        
        artists = data.get('data', [])
        if not artists:
            return {}, set()
        
        artist_id = artists[0]['id']
        
        # Top tracks
        top_url = f"https://api.deezer.com/artist/{artist_id}/top?limit=10"
        req = urllib.request.Request(top_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            top_data = json.loads(resp.read().decode())
            for t in top_data.get('data', []):
                top_titles.add(clean_title(t.get('title', '')).lower())
                album = t.get('album', {})
                if album.get('title'):
                    top_titles.add(clean_title(album.get('title', '')).lower())

        # Artist albums
        alb_url = f"https://api.deezer.com/artist/{artist_id}/albums?limit=50"
        req = urllib.request.Request(alb_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            alb_data = json.loads(resp.read().decode())
            for a in alb_data.get('data', []):
                key = clean_title(a.get('title', '')).lower()
                deezer_albums[key] = {
                    'deezerUrl': a.get('link', ''),
                    'cover_xl': a.get('cover_xl', '')
                }
    except Exception as e:
        sys.stderr.write(f"Deezer error: {e}\n")
    return deezer_albums, top_titles

def build_releases(artist_name, apple_id, spotify_url, covers_dir):
    os.makedirs(covers_dir, exist_ok=True)
    
    albums = fetch_itunes_albums(apple_id, artist_name)
    deezer_albums, top_titles = fetch_deezer_data(artist_name)
    
    if not albums:
        sys.stderr.write("No albums found via iTunes.\n")
        return []

    # Sort albums by release date descending
    albums.sort(key=lambda x: x.get('releaseDate', ''), reverse=True)
    
    # 3 newest releases
    selected = []
    seen_titles = set()
    
    for alb in albums:
        slug = slugify(alb['title'])
        if slug not in seen_titles:
            selected.append(alb)
            seen_titles.add(slug)
        if len(selected) == 3:
            break
            
    # 2 top releases (look for all-time top hits or older fan-favorites)
    top_candidates = []
    for alb in albums:
        slug = slugify(alb['title'])
        if slug in seen_titles:
            continue
        # Check if title matches Deezer top tracks
        if alb['title'].lower() in top_titles:
            top_candidates.append(alb)
            seen_titles.add(slug)
        if len(top_candidates) == 2:
            break
            
    # If not enough top candidates from Deezer, pick the most established older releases
    if len(top_candidates) < 2:
        for alb in reversed(albums):
            slug = slugify(alb['title'])
            if slug not in seen_titles:
                top_candidates.append(alb)
                seen_titles.add(slug)
            if len(top_candidates) == 2:
                break
                
    final_raw = selected + top_candidates
    
    # Download covers in parallel
    download_tasks = []
    releases = []
    
    with ThreadPoolExecutor(max_workers=5) as executor:
        for alb in final_raw:
            slug = slugify(alb['title'])
            cover_filename = f"{slug}.jpg"
            cover_path = os.path.join(covers_dir, cover_filename)
            cover_web_path = f"/covers/{cover_filename}"
            
            # Prefer Deezer XL cover if available, otherwise iTunes 1000x1000
            d_info = deezer_albums.get(alb['title'].lower(), {})
            img_url = d_info.get('cover_xl') or alb['artwork']
            
            download_tasks.append(executor.submit(download_image, img_url, cover_path))
            
            q = urllib.parse.quote(f"{artist_name} {alb['title']}")
            
            rel = {
                "id": slug,
                "title": alb['title'],
                "type": alb['type'],
                "releaseDate": alb['releaseDate'],
                "coverArt": cover_web_path,
                "appleMusicUrl": alb['appleMusicUrl'],
                "deezerUrl": d_info.get('deezerUrl') or f"https://www.deezer.com/search/{q}",
                "youtubeMusicUrl": f"https://music.youtube.com/search?q={q}",
                "amazonMusicUrl": f"https://music.amazon.com/search/{q}",
                "tidalUrl": f"https://listen.tidal.com/search?q={q}",
                "spotifyUrl": spotify_url if spotify_url else f"https://open.spotify.com/search/{q}"
            }
            releases.append(rel)
            
    return releases

def main():
    parser = argparse.ArgumentParser(description="Fetch artist releases and covers")
    parser.add_argument("--artist-name", required=True, help="Artist Name")
    parser.add_argument("--apple-id", default="", help="Apple Music Artist ID")
    parser.add_argument("--spotify-url", default="", help="Artist Spotify URL")
    parser.add_argument("--covers-dir", default="./public/covers", help="Target covers folder")
    
    args = parser.parse_args()
    releases = build_releases(args.artist_name, args.apple_id, args.spotify_url, args.covers_dir)
    print(json.dumps(releases, indent=2))

if __name__ == "__main__":
    main()
