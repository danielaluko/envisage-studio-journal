// Studio Journal site behavior. YouTube loads only after a visitor clicks Play.
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const config = window.ENVISAGE_CONFIG || {};
const contactLink = document.getElementById('contact-link');
const projectSubject = '?subject=Project%20enquiry%20%E2%80%94%20Envisage%20Multimedia';
contactLink.href = 'mailto:' + (config.contactEmail ? encodeURIComponent(config.contactEmail) : '') + projectSubject;

const fallbackUrl = 'https://www.youtube.com/playlist?list=PLR482mXVSRbDYGLdYRq0s86sNEdqSaQHo';
const playlistUrl = config.youtubePlaylistUrl || fallbackUrl;
const playlistLink = document.getElementById('playlist-link');
const youtubeFallback = document.getElementById('youtube-fallback');
const playButton = document.getElementById('play-collection');
const videoStage = document.getElementById('video-stage');
let playlistId = null;
try {
  const suppliedUrl = new URL(playlistUrl);
  if (suppliedUrl.hostname === 'youtube.com' || suppliedUrl.hostname === 'www.youtube.com' || suppliedUrl.hostname === 'm.youtube.com') {
    const id = suppliedUrl.searchParams.get('list');
    if (id && /^[a-zA-Z0-9_-]{12,}$/.test(id)) playlistId = id;
  }
} catch (error) {
  console.warn('Invalid YouTube playlist URL in site-config.js');
}

// Only allow links pointing to an explicitly validated YouTube playlist.
const publicPlaylist = playlistId ? 'https://www.youtube.com/playlist?list=' + encodeURIComponent(playlistId) : fallbackUrl;
playlistLink.href = publicPlaylist;
youtubeFallback.href = publicPlaylist;
if (!playlistId) {
  playButton.disabled = true;
  playButton.title = 'Playlist is not configured; use the YouTube link instead';
} else {
  playButton.addEventListener('click', () => {
    if (videoStage.classList.contains('is-playing')) return;
    const iframe = document.createElement('iframe');
    // A playlist embed shows the videos and allows navigation through the collection.
    iframe.src = 'https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(playlistId) + '&autoplay=1&playsinline=1';
    iframe.title = 'Envisage Multimedia — YouTube video collection';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('allowfullscreen', '');
    videoStage.classList.add('is-playing');
    playButton.remove();
    videoStage.appendChild(iframe);
  });
}