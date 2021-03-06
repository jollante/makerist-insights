const browser = chrome || browser;

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    sendUrlChangedEvent(tabId, changeInfo.url, 'tabUpdated');
});

browser.webNavigation.onCompleted.addListener((details) => {
    sendUrlChangedEvent(details.tabId, details.url);
});

function sendUrlChangedEvent(tabId, url, message = 'loadCompleted') {
    if(tabId && url && url.indexOf('/sold_items') !== -1) {
        browser.tabs.sendMessage(tabId, {
            message,
            url
        });
    }
}