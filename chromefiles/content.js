
chrome.runtime.sendMessage({type: 'updateValue'}, (response) => {
    if(response == 'success') {
      console.log("loaded background.js")
  }
});


