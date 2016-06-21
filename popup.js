
// when popup document loaded get content
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    chrome.tabs.query(
        {currentWindow: true, active : true},
        onGetCurrent
    )
});

// use tab id to get clacks header
function onGetCurrent(tabs){
    console.log('Activated: '+tabs[0].windowId+':'+tabs[0].id);
    chrome.runtime.sendMessage({windowId: tabs[0].windowId, tabId: tabs[0].id}, onResponse);
}

// show clacks header
function onResponse(response){
    console.log('onResponse');
    console.log(response);
    var message = '';
    if (response){
        message = response.name +': '+response.value;
    }
    document.getElementById('status').textContent = message;
}