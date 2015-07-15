chrome.commands.onCommand.addListener(dispatch);

function dispatch(command, tab) {
  if (command === "movetab") {
    moveTab(tab);
  }
}

function moveTab(tab) {
  chrome.storage.local.get('savedWindow', function(storage) {
    var savedToWindow = storage.savedWindow;
    if (savedToWindow == undefined) {
      alert("You haven't selected a target window yet!");
      return;
    }
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
      if (tabs.length > 1) {
        alert('Too many tabs found!');
        return;
      }
      try {
        chrome.tabs.create({
          'windowId': savedToWindow,
          'url': tabs[0].url,
        });
        
        chrome.windows.update(savedToWindow, {'focused': true});
        chrome.tabs.remove(tabs[0].id);
        
      } catch (e) {
        alert(e);
      }
    });
  });
}