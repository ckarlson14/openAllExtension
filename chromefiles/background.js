// background.js

console.log("background.js loaded")
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.type === 'updateValue') {
        response('success');
    }
});



