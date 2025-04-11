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