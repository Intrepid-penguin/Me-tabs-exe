// background.js
chrome.runtime.onInstalled.addListener(function() {
    console.log("Enhanced Tab Manager extension installed");
  });
  
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    chrome.tabs.get(tabId, function(tab) {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
      }
  
      chrome.storage.sync.get({tabGroups: {}}, function(data) {
        if (!data.tabGroups['Auto-Saved']) {
          data.tabGroups['Auto-Saved'] = [];
        }
        
        data.tabGroups['Auto-Saved'].push({
          url: tab.url,
          title: tab.title
        });
  
        chrome.storage.sync.set({tabGroups: data.tabGroups}, function() {
          console.log('Tab auto-saved:', tab.title);
        });
      });
    });
  });
  