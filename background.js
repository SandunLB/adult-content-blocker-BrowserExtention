// background.js

const blockedSites = [
    "*://*.facebook.com/*",
    "*://*.youtube.com/*"
  ];
  
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      return { cancel: true };
    },
    { urls: blockedSites },
    ["blocking"]
  );
  