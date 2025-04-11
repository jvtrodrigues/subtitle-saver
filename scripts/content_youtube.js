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
      chrome.runtime.sendMessage({ action: "update_badge" });
    });
  }
}

function toggleSubtitle() {
  // Not Implemented
  return;
}

function rewind5Seconds() {
  // Not Implemented
  return;
}

chrome.runtime.onMessage.addListener((req) => {
  if (req.action === "save_subtitle") sendSubtitle();
  if (req.action === "toggle_subtitle") toggleSubtitle();
  if (req.action === "rewind_5_Seconds") toggleSubtitle();
});
