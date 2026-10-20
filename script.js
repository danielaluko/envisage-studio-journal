/* Envisage Studio Journal: responsive navigation, configured email, click-to-load YouTube player. */
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('primary-navigation');
if (menu && navigation) {
  menu.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const config = window.ENVISAGE_CONFIG || {};
const contactLink = document.getElementById('contact-link');
const subject = '?subject=Project%20enquiry%20%E2%80%94%20Envisage%20Multimedia';
if (contactLink) contactLink.href = 'mailto:' + (config.contactEmail || '').trim() + subject;

const defaultPlaylist = 'https://www.youtube.com/playlist?list=PLR482mXVSRbDYGLdYRq0s86sNEdqSaQHo';
const playlistInput = config.youtubePlaylistUrl || defaultPlaylist;
let playlistId = null;
try {
  const candidate = new URL(playlistInput);
  if (['youtube.com','www.youtube.com','m.youtube.com'].includes(candidate.hostname)) {
    const id = candidate.searchParams.get('list');
    if (id && /^[a-zA-Z0-9_-]{12,}$/.test(id)) playlistId = id;
  }
} catch (_) { /* Direct fallback link remains available. */ }
const playlistUrl = playlistId ? 'https://www.youtube.com/playlist?list=' + encodeURIComponent(playlistId) : defaultPlaylist;
['playlist-link', 'youtube-fallback'].forEach(id => {
  const anchor = document.getElementById(id);
  if (anchor) anchor.href = playlistUrl;
});
const play = document.getElementById('play-collection');
const stage = document.getElementById('video-stage');
if (play && stage) {
  if (!playlistId) {
    play.disabled = true;
    play.title = 'YouTube playlist is unavailable; open YouTube instead.';
  } else {
    play.addEventListener('click', () => {
      if (stage.classList.contains('is-playing')) return;
      const player = document.createElement('iframe');
      player.src = 'https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(playlistId) + '&autoplay=1&playsinline=1';
      player.title = 'Envisage Multimedia video collection';
      player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.setAttribute('allowfullscreen', '');
      stage.classList.add('is-playing');
      stage.appendChild(player);
      play.remove();
    });
  }
}
