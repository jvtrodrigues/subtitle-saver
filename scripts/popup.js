function renderList(subtitles) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  subtitles.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "subtitle-entry";

    const span = document.createElement("span");
    span.textContent = item.text;

    const copy = document.createElement("button");
    copy.textContent = "📋";
    copy.onclick = () => navigator.clipboard.writeText(item.text);

    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = () => {
      subtitles.splice(index, 1);
      chrome.storage.local.set({ subtitles }, () => renderList(subtitles));
    };

    const div2 = document.createElement("div");

    div.appendChild(span);
    div.appendChild(div2);
    div2.appendChild(copy);
    div2.appendChild(del);
    list.appendChild(div);
  });
}

document.getElementById("clear-all").onclick = () => {
  chrome.storage.local.set({ subtitles: [] }, () => renderList([]));
};

document.getElementById("sort-new").onclick = () => {
  chrome.storage.local.get({ subtitles: [] }, (data) => {
    const sorted = data.subtitles.sort((a, b) => b.createdAt - a.createdAt);
    renderList(sorted);
  });
};

document.getElementById("sort-old").onclick = () => {
  chrome.storage.local.get({ subtitles: [] }, (data) => {
    const sorted = data.subtitles.sort((a, b) => a.createdAt - b.createdAt);
    renderList(sorted);
  });
};

document.getElementById("copy-all").addEventListener("click", () => {
  chrome.storage.local.get({ subtitles: [] }, (data) => {
    const allText = data.subtitles.map(s => s.text).join("\n\n");
    navigator.clipboard.writeText(allText);
  });
});

chrome.storage.local.get({ subtitles: [] }, (data) => {
  renderList(data.subtitles);
});
