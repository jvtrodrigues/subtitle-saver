function getSubtitle() {
    const window = document.querySelector('[class*="CaptionWindow"]');
    if (!window) return "";

    const cues = window.querySelectorAll('[class*="TextCue"]');
    const text = Array.from(cues).map(el => el.innerText.trim()).join("\n");
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

async function openTrackSelector() {
    document.querySelector('[data-testid="player-ux-track-selector-button"]').click();
}

async function closeTrackSelector() {
    document.querySelector('[data-testid="player-ux-track-dismiss-button"]').click();
}

async function showSubtitle() {
    await openTrackSelector();
    Array.from(document.querySelectorAll('[class*="TrackLabel-Fuse"]')).find(el => el.innerText === 'English CC').click();
    await closeTrackSelector();
}

async function hideSubtitle() {
    await openTrackSelector();
    Array.from(document.querySelectorAll('[class*="TrackLabel-Fuse"]')).find(el => el.innerText === 'Off').click();
    await closeTrackSelector();
}

async function toggleSubtitle() {
    const isSubtitleVisible = document.querySelector('[class*="CaptionWindow"]');

    if (!!isSubtitleVisible) await hideSubtitle();
    else await showSubtitle();
}

async function rewind5Seconds() {
    await showSubtitle();
    document.querySelectorAll('video').forEach(v => v.currentTime -= 5);
}

chrome.runtime.onMessage.addListener((req) => {
    if (req.action === "save_subtitle") sendSubtitle();
    if (req.action === "toggle_subtitle") toggleSubtitle();
    if (req.action === "rewind_5_Seconds") rewind5Seconds();
});