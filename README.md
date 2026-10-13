# Envisage Multimedia — Studio Journal (YouTube player restored)

Netlify-ready static portfolio, reconstructed from recovered Studio Journal content and design direction, **not an exact export of the earlier Work project**.

## Featured YouTube collection

- Original recovered playlist: https://www.youtube.com/playlist?list=PLR482mXVSRbDYGLdYRq0s86sNEdqSaQHo
- **Play collection** loads an embedded 16:9 YouTube playlist player on demand, supporting normal YouTube playlist navigation.
- **View full playlist** and **watch on YouTube** open the same playlist directly in a new tab. These remain available even if embedded playback is restricted.
- Browser privacy tools, device settings, or individual YouTube video/channel embedding restrictions may prevent playback in the embedded player. To address the latter, the channel owner can check YouTube Studio > Content > Video > Details > Show more > Allow embedding.
- YouTube video availability and playback can't be guaranteed from this archive alone.
- Edit `site-config.js` to change the playlist URL if needed.

## Before publishing

Set `contactEmail` in `site-config.js`. It is empty until the actual contact address is supplied. Review illustrations and copy; the conceptual artwork is CSS-generated. No backend, API keys, npm, or build process are required.

## Netlify deployment

Unzip this archive. Go to https://app.netlify.com/drop and upload the **folder containing index.html** (not this ZIP directly). Netlify will provide a free `.netlify.app` URL. To redeploy an existing Netlify site, use its deploy dashboard and upload the same extracted folder.

## Local testing

Open `index.html` in a browser. The site renders offline, but YouTube and Google Fonts require internet. Playback is best validated after publishing to Netlify on HTTPS.