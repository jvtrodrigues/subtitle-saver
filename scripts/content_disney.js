function getSubtitle() {
    const cueWindow = document.querySelector('.hive-subtitle-renderer-cue-window');
    if (!cueWindow) return "";

    const lines = cueWindow.querySelectorAll('.hive-subtitle-renderer-line');
    const text = Array.from(lines).map(line => line.innerText.trim()).join("\n");
    return text;
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
