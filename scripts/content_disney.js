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
            chrome.runtime.sendMessage({ action: "update_badge" });
        });
    }
}

function showSubtitle() {
    document.getElementById('subtitleTrackPicker-5').click();
}

function hideSubtitle() {
    document.getElementById('subtitleTrackPicker-off').click();
}

function toggleSubtitle() {
    const isSubtitleVisible = document.querySelector('.hive-subtitle-renderer-cue-window');

    if (isSubtitleVisible) hideSubtitle();
    else showSubtitle();
}

function rewind5Seconds() {
    showSubtitle();
    document.querySelectorAll('video').forEach(v => v.currentTime -= 5);
}

chrome.runtime.onMessage.addListener((req) => {
    if (req.action === "save_subtitle") sendSubtitle();
    if (req.action === "toggle_subtitle") toggleSubtitle();
    if (req.action === "rewind_5_Seconds") rewind5Seconds();
});
