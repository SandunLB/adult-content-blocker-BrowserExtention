// background.js

chrome.runtime.onInstalled.addListener(() => {
  // Initial setup or rules update can be done here
  console.log('Service worker installed');
  updateBlockedSites(blockedSites);
});

// Function to update dynamic rules
function updateBlockedSites(newBlockedSites) {
  const rules = newBlockedSites.map((site, index) => ({
    id: index + 1, // Ensure unique IDs for each rule
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `*://${site}/*`,
      resourceTypes: ["main_frame", "sub_frame"]
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log('Dynamic rules updated');
    }
  });
}


const blockedSites = [
  "example.com",
  "example.net",
  "example.org",
  "test.com",
  "demo.com",
  "example123.com",
  "mysite.com",
  "testsite.com",
  "website.com",
  "mydomain.com"
];

updateBlockedSites(blockedSites);
