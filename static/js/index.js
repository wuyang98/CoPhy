'use strict';

const videos = [...document.querySelectorAll('video')];
for (const video of videos) {
  video.addEventListener('play', () => {
    for (const other of videos) {
      if (other !== video) other.pause();
    }
  });
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
});

const copyButton = document.getElementById('copy-bibtex');
const citation = document.getElementById('citation');
const status = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(citation.textContent.trim());
    status.textContent = 'Citation copied to clipboard.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Automatic copy is unavailable. Citation selected — press Ctrl+C (Windows) or Command+C (Mac).';
  }
});
