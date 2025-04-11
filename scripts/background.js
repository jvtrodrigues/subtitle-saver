function updateBadge() {
  chrome.storage.local.get({ subtitles: [] }, (data) => {
    const count = data.subtitles.length.toString();
    chrome.browserAction.setBadgeText({ text: count });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#FF4500" });
  });
}

// main
chrome.commands.onCommand.addListener((command) => {
  if (command === "save_subtitle") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "save_subtitle" });
    });
  }
  if (command === "toggle_subtitle") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_subtitle" });
    });
  }
  if (command === "rewind_5_Seconds") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "rewind_5_Seconds" });
    });
  }
});

// update badge
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.subtitles) {
    updateBadge();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "update_badge") {
    updateBadge();
  }
});
