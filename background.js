// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('Service worker installed');
  updateBlockedSites(blockedSites);
});

// Function to update dynamic rules
function updateBlockedSites(newBlockedSites) {
  // Remove all existing rules first
  chrome.declarativeNetRequest.getDynamicRules(existingRules => {
    const ruleIdsToRemove = existingRules.map(rule => rule.id);
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIdsToRemove,
      addRules: []
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        // Now add the new rules
        const rules = newBlockedSites.map((site, index) => ({
          id: index + 1, 
          priority: 1,
          action: { 
            type: "redirect",
            redirect: { url: "https://example.com/blocked" }
          },
          condition: {
            urlFilter: `*://${site}/*`,
            resourceTypes: ["main_frame"]
          }
        }));
        
        chrome.declarativeNetRequest.updateDynamicRules({
          addRules: rules
        }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            console.log('Dynamic rules updated');
          }
        });
      }
    });
  });
}

// Example usage with well-known adult content sites for testing
const blockedSites = [
  "pornhub.com",
  "xvideos.com",
  "redtube.com",
  "xnxx.com",
  "youporn.com",
  "tube8.com",
  "xhamster.com",
  "spankbang.com",
  "youjizz.com",
  "tnaflix.com",
  // Add more sites as needed
];

updateBlockedSites(blockedSites);
