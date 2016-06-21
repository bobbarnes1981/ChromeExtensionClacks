
// clacks header dictonary
var headers = {};

// listen for any header
chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {urls: [], types: ['main_frame']}, ['responseHeaders']);

// check for clacks header and set icon
function onHeadersReceived(details){
    console.log('onHeadersReceived');
    if (details.responseHeaders){
        var clacks = getHeader(details.responseHeaders, 'X-Clacks-Overhead');
        updateClacks(details.tabId, clacks);
        setIcon(details.tabId);
    }
}

// listen for activated tab
chrome.tabs.onActivated.addListener(onActivated);

// set icon when tab is activated
function onActivated(activeInfo){
    console.log('Activated: '+activeInfo.windowId+':'+activeInfo.tabId);
    setIcon(activeInfo.tabId);
}

// listen for removed tab
chrome.tabs.onRemoved.addListener(onRemoved);

// unset the dictionary when tab is removed
function onRemoved(tabId, removeInfo){
    console.log('Removed: '+removeInfo.windowId+':'+tabId);
    updateClacks(tabId, null);
}

// listen for message
chrome.runtime.onMessage.addListener(onMessage);

// respond to request with clacks header
function onMessage(request, sender, sendResponse){
    console.log('onMessage');
    console.log(request);
    sendResponse(headers[request.tabId]);
};

// get header from array
function getHeader(headers, name){
	for (var i = 0; i < headers.length; i++){
		if (headers[i].name == name){
			return headers[i];
		}
	}
	return null;
}

// update the clacks dictionary
function updateClacks(tabId, clacks){
    console.log('Tab: '+tabId+' Clacks: '+(clacks ? clacks.value : 'NONE'));
    headers[tabId] = clacks;
}

// set icon based on tabId
function setIcon(tabId){
    var iconPath = headers[tabId] ? 'icon_enabled.png' : 'icon_disabled.png';
    console.log(iconPath);
    chrome.browserAction.setIcon({
        path: iconPath
    });
}
