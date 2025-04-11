chrome.commands.onCommand.addListener((command) => {
  if (command === "save_subtitle") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "save_subtitle" });
    });
  }
});