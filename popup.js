document.getElementById("openTabs").addEventListener("click", function () {
    const urlInput = document.getElementById("urlInput").value;
    const urls = urlInput.split("\n").map(url => url.trim()).filter(url => url !== "");

    if (urls.length === 0) {
        console.log("No URLs provided!");
        alert("Please enter at least one valid URL.");
        return;
    }

    const closeAfterTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    const createdTabs = [];

    urls.forEach(url => {
        chrome.tabs.create({ url }, function (tab) {
            createdTabs.push(tab.id); // Keep track of tab IDs

            // Inject content.js into the opened tab
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
            });
        });
    });

    // Close the tabs after 15 minutes
    setTimeout(() => {
        createdTabs.forEach(tabId => {
            chrome.tabs.remove(tabId, () => {
                console.log(`Tab ${tabId} closed after 15 minutes.`);
            });
        });
    }, closeAfterTime);
});
