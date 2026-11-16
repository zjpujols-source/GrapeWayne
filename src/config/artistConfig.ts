import { ArtistConfig } from '../types/artist';

export const defaultArtistConfig: ArtistConfig = {
  // ============================================================
  // ARTIST INFORMATION
  // ============================================================
  artistName: "Grape Wayne",

  // ============================================================
  // HERO ASSETS (Camera roll video will be uploaded later)
  // ============================================================
  heroVideoUrl: "/hero-video.mp4",
  heroImage: "/hero-poster.jpg",
  profileImage: "/hero-poster.jpg",

  // ============================================================
  // SOCIALS & STREAMING LINKS
  // ============================================================
  socials: [
    {
      id: "instagram",
      platform: "instagram",
      url: "https://www.instagram.com/grapewayne",
      label: "Instagram"
    },
    {
      id: "spotify",
      platform: "spotify",
      url: "https://open.spotify.com/artist/3QFqQk8KxsAiFAYZVla3t1",
      label: "Spotify",
      isStreaming: true
    },
    {
      id: "apple-music",
      platform: "apple-music",
      url: "https://music.apple.com/us/artist/grape-wayne/1852308999",
      label: "Apple Music",
      isStreaming: true
    },
    {
      id: "youtube",
      platform: "youtube",
      url: "https://www.youtube.com/@GrapeWayneMusic",
      label: "YouTube"
    },
    {
      id: "tiktok",
      platform: "tiktok",
      url: "https://www.tiktok.com/@grapeweezy",
      label: "TikTok"
    }
  ],

  // ============================================================
  // SITE TABS
  // ============================================================
  tabs: {
    music: {
      enabled: true,
      title: "MUSIC",
      releases: [
        {
          id: "henry-lee-feat-grape-wayne",
          title: "Henry Lee (feat. Grape Wayne)",
          type: "single",
          releaseDate: "October 30, 2026",
          coverArt: "/covers/henry-lee-feat-grape-wayne.jpg",
          tracks: [
            {
              id: "track-6828137985",
              title: "Henry Lee (feat. Grape Wayne)",
              previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ad/04/1d/ad041dc3-5b48-9bb7-6067-63a290ad3892/mzaf_18191812659019012490.plus.aac.p.m4a"
            }
          ],
          appleMusicUrl: "https://music.apple.com/us/album/henry-lee-feat-grape-wayne-single/6828137984",
          itunesUrl: "https://itunes.apple.com/us/album/henry-lee-feat-grape-wayne-single/6828137984",
          spotifyUrl: "https://open.spotify.com/album/1txjQaIuVssSANOaUL98k6",
          youtubeMusicUrl: "https://music.youtube.com/search?q=Grape%20Wayne%20Henry%20Lee",
          amazonMusicUrl: "https://music.amazon.com/search/Grape%20Wayne%20Henry%20Lee",
          deezerUrl: "https://www.deezer.com/search/Grape%20Wayne%20Henry%20Lee",
          tidalUrl: "https://listen.tidal.com/search?q=Grape%20Wayne%20Henry%20Lee"
        },
        {
          id: "mattress-factory-feat-syl-dubenion",
          title: "Mattress Factory (feat. Syl Dubenion)",
          type: "single",
          releaseDate: "May 18, 2026",
          coverArt: "/covers/mattress-factory-feat-syl-dubenion.jpg",
          tracks: [
            {
              id: "track-6767780602",
              title: "Mattress Factory (feat. Syl Dubenion)",
              previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ca/ca/7f/caca7fef-578d-91d9-68ba-660e7fcd6606/mzaf_11711023592328479306.plus.aac.p.m4a"
            }
          ],
          appleMusicUrl: "https://music.apple.com/us/album/mattress-factory-feat-syl-dubenion-single/6767780600",
          itunesUrl: "https://itunes.apple.com/us/album/mattress-factory-feat-syl-dubenion-single/6767780600",
          spotifyUrl: "https://open.spotify.com/artist/3QFqQk8KxsAiFAYZVla3t1",
          youtubeUrl: "https://www.youtube.com/watch?v=NYYGYSzzw6A",
          youtubeMusicUrl: "https://music.youtube.com/search?q=Grape%20Wayne%20Mattress%20Factory",
          amazonMusicUrl: "https://music.amazon.com/search/Grape%20Wayne%20Mattress%20Factory",
          deezerUrl: "https://www.deezer.com/search/Grape%20Wayne%20Mattress%20Factory",
          tidalUrl: "https://listen.tidal.com/search?q=Grape%20Wayne%20Mattress%20Factory"
        },
        {
          id: "teeth",
          title: "Teeth",
          type: "single",
          releaseDate: "March 13, 2026",
          coverArt: "/covers/teeth.jpg",
          tracks: [
            {
              id: "track-1884302367",
              title: "Teeth",
              previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/40/9c/2a/409c2a20-28cc-34c3-12f7-8c591921c08d/mzaf_13034548674058723864.plus.aac.p.m4a"
            }
          ],
          appleMusicUrl: "https://music.apple.com/us/album/teeth-single/1884302364",
          itunesUrl: "https://itunes.apple.com/us/album/teeth-single/1884302364",
          spotifyUrl: "https://open.spotify.com/album/2iuz8Fc8nDEV3PHod8XO91",
          youtubeUrl: "https://www.youtube.com/watch?v=qQr1mQw-oyQ",
          youtubeMusicUrl: "https://music.youtube.com/search?q=Grape%20Wayne%20Teeth",
          amazonMusicUrl: "https://music.amazon.com/search/Grape%20Wayne%20Teeth",
          deezerUrl: "https://www.deezer.com/album/937426521",
          tidalUrl: "https://listen.tidal.com/search?q=Grape%20Wayne%20Teeth"
        },
        {
          id: "many-things-are-destroying-me",
          title: "Many Things Are Destroying Me",
          type: "single",
          releaseDate: "November 19, 2025",
          coverArt: "/covers/many-things-are-destroying-me.jpg",
          tracks: [
            {
              id: "track-1853440779",
              title: "Many Things Are Destroying Me",
              previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b9/be/b0/b9beb033-f0c9-2850-cc83-9b414a78a3a4/mzaf_17199993737811424370.plus.aac.p.m4a"
            }
          ],
          appleMusicUrl: "https://music.apple.com/us/album/many-things-are-destroying-me-single/1853440778",
          itunesUrl: "https://itunes.apple.com/us/album/many-things-are-destroying-me-single/1853440778",
          spotifyUrl: "https://open.spotify.com/artist/3QFqQk8KxsAiFAYZVla3t1",
          youtubeUrl: "https://www.youtube.com/watch?v=phKvJ1CcTS0",
          youtubeMusicUrl: "https://music.youtube.com/search?q=Grape%20Wayne%20Many%20Things%20Are%20Destroying%20Me",
          amazonMusicUrl: "https://music.amazon.com/search/Grape%20Wayne%20Many%20Things%20Are%20Destroying%20Me",
          deezerUrl: "https://www.deezer.com/album/857890852",
          tidalUrl: "https://listen.tidal.com/search?q=Grape%20Wayne%20Many%20Things%20Are%20Destroying%20Me"
        }
      ]
    },

    videos: {
      enabled: true,
      title: "VIDEOS",
      items: [
        {
          id: "video-1",
          title: "Grape Wayne - Mattress Factory (Official Video)",
          youtubeId: "NYYGYSzzw6A",
          thumbnail: "https://img.youtube.com/vi/NYYGYSzzw6A/maxresdefault.jpg"
        },
        {
          id: "video-2",
          title: "Grape Wayne - Many Things are Destroying Me (Official Video)",
          youtubeId: "phKvJ1CcTS0",
          thumbnail: "https://img.youtube.com/vi/phKvJ1CcTS0/maxresdefault.jpg"
        },
        {
          id: "video-3",
          title: "Grape Wayne - Teeth",
          youtubeId: "qQr1mQw-oyQ",
          thumbnail: "https://img.youtube.com/vi/qQr1mQw-oyQ/hqdefault.jpg"
        }
      ]
    },

    live: {
      enabled: true,
      title: "LIVE",
      status: "coming_soon"
    },

    shop: {
      enabled: true,
      title: "STORE",
      status: "coming_soon"
    },

    contact: {
      enabled: true,
      title: "CONTACT",
      managementEmail: ""
    }
  }
};
