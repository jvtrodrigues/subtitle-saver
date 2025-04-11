function getSubtitle() {
    const captions = document.querySelector('.ytp-caption-segment');
    return captions?.innerText || '';
  }
  
  function sendSubtitle() {
    const subtitle = getSubtitle();
    if (subtitle.trim()) {
      chrome.storage.local.get({ subtitles: [] }, (data) => {
        const updated = data.subtitles.concat({ text: subtitle, createdAt: Date.now() });
        chrome.storage.local.set({ subtitles: updated });
      });
    }
  }
  
  chrome.runtime.onMessage.addListener((req) => {
    if (req.action === "save_subtitle") sendSubtitle();
  });
  