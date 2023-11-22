// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
	// Send a message to the active tab
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
	});
});
var tabIdToPreviousUrl={}
document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			chrome.tabs.sendMessage(tabId, { "message": 'tab_url', "url": tab.url });
		})
		
		// if (tab.url && tab.url.match(/<regex>/g)) {
		// 	var previousUrl = "";
		// 	if (tabId in tab) {
		// 		previousUrl = tabIdToPreviousUrl[tabId];
		// 	}
		// 	// If the domain is different perform action.
		// 	if (previousUrl !== tab.url) {
		// 		chrome.tabs.sendMessage(tabId, { "message": 'tab_url', "url": tab.url });
		// 	}
		// 	// Add the current url as previous url
		// 	tabIdToPreviousUrl[tabId] = tab.url;
		// }
	});
})
// chrome.tabs.onActivated.addListener(function (tabId, changeInfo, tab) {
// 	//const totalAmount = matches.length
// 	if (changeInfo.url){
// 		chrome.tabs.sendMessage(tabId, { "message": 'tab_url', "url": tab.url });
// 	}
	
// });
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// 	//const totalAmount = matches.length
// 	chrome.tabs.sendMessage(tabId, { "message": 'tab_url', "url": tab.url });
// });