# Agent Instructions — Ultra-Fast Artist Website Generation (2-Minute Target)

When the user requests to create or personalize an artist website (e.g. *"use the GitHub October artist template to make a website for [artist name]..."*):

## 1. Non-Negotiable Contract
Follow `AI_STUDIO_RULES.md`. Keep the visual design, components, and animations 100% intact. Only update config and assets.

## 2. Ultra-Fast Parallel Execution Protocol
Do NOT serialize tasks. Do NOT run dozens of Google web searches for non-existent platforms. Follow this exact workflow:

### Step 1: Immediate Worker Launch (Second 1)
Extract the Artist Name, Apple Music URL/ID, Spotify URL, and YouTube video URLs from the prompt. Immediately launch parallel subagents:

- **Worker 1 (Discography & Cover Art Specialist)**:
  * Run the bundled script:
    `python3 scripts/fetch_releases.py --artist-name "<Artist>" --apple-id "<AppleId>" --spotify-url "<SpotifyUrl>"`
  * This returns the 3 newest releases + 2 top hits, downloads crisp 1000x1000 artwork into `public/covers/`, and provides typed streaming links in **under 3 seconds**.
  * **Zero-Search Policy**: Never run ad-hoc web searches for niche platforms (Bandcamp, Audiomack, Pandora, iHeartRadio). The site's `StreamModal.tsx` automatically hides buttons for missing platforms.
  * Send JSON array of `Release[]` back to Lead Agent.

- **Worker 2 (Socials & Videos Specialist)**:
  * Format provided social links (`SocialLink[]`).
  * Fetch video titles via YouTube oEmbed (`https://www.youtube.com/oembed?url=...&format=json`) and format `VideoItem[]` with `thumbnail: "https://img.youtube.com/vi/{id}/hqdefault.jpg"`.
  * Send JSON back to Lead Agent.

### Step 2: Orchestrator Actions (Runs in Parallel)
While Workers 1 & 2 execute:
1. Clone `ArtistWebsiteTemplateOctober` into `scratch/[ArtistName]`.
2. Update `metadata.json`, `index.html`, and `wrangler.jsonc` with the artist slug.
3. Configure GitHub repo (`zjpujols-source/[ArtistName]`) and copy Cloudflare secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).
4. **No Busy Polling**: Do NOT run 15-second schedule timers or poll subagent logs. Sleep reactively and wait for messages.

### Step 3: Fast Assemble & Deploy
1. When worker messages arrive, perform a single write updating `src/config/artistConfig.ts`.
2. Run `npm run build` (builds in ~1 second).
3. Deploy live via `npx wrangler deploy` and push to GitHub `main`.
4. Return the live Cloudflare URL.

## 3. Mobile Camera Roll Video Workflow
The user uploads the background video clip after site creation from their phone's camera roll via an iOS Shortcut.
- Do NOT block or wait for local video files.
- The site deploys with `public/hero-poster.jpg`.
- When the phone uploads the video, GitHub Actions (`.github/workflows/deploy.yml`) automatically optimizes it with FFmpeg and redeploys live.
