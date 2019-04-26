chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.transitionType === 'reload') {
    chrome.tabs.executeScript({file: "twitch.js", runAt: "document_start"});
    chrome.tabs.insertCSS({file: "twitch.css"});
  }
}, {url: [{hostSuffix: "twitch.tv"}]});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.executeScript({file: "twitch.js", runAt: "document_start"});
  chrome.tabs.insertCSS({file: "twitch.css"});
}, {url: [{hostSuffix: "twitch.tv"}]});
