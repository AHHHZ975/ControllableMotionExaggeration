document.addEventListener('DOMContentLoaded', () => {
  const youtubePlayer = document.querySelector('.youtube-player');
  if (youtubePlayer) {
    const videoId = youtubePlayer.dataset.youtubeId?.trim();
    if (videoId && videoId !== 'YOUR_YOUTUBE_VIDEO_ID') {
      const frame = youtubePlayer.querySelector('iframe');
      frame.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`;
      frame.hidden = false;
      youtubePlayer.querySelector('.youtube-placeholder')?.remove();
    }
  }

  const tabs = [...document.querySelectorAll('.result-tab')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((item) => { item.classList.remove('is-active'); item.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.result-panel').forEach((panel) => { panel.classList.remove('is-active'); panel.hidden = true; });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.dataset.result);
    panel.hidden = false;
    panel.classList.add('is-active');
  }));

  const copyButton = document.querySelector('.copy-bibtex-btn');
  copyButton?.addEventListener('click', async () => {
    const text = document.getElementById('bibtex-code').textContent;
    try { await navigator.clipboard.writeText(text); }
    catch { const range = document.createRange(); range.selectNode(document.getElementById('bibtex-code')); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); document.execCommand('copy'); selection.removeAllRanges(); }
    copyButton.classList.add('copied');
    copyButton.querySelector('span').textContent = 'Copied';
    setTimeout(() => { copyButton.classList.remove('copied'); copyButton.querySelector('span').textContent = 'Copy'; }, 1800);
  });

  const scrollButton = document.querySelector('.scroll-to-top');
  window.addEventListener('scroll', () => scrollButton.classList.toggle('visible', window.scrollY > 500), {passive: true});
  scrollButton.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
});
