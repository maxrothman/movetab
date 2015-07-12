document.getElementById('inspector').addEventListener('click', function(){
  try {
    chrome.tabs.create({
      'url': 'inspector.html',
      'active': true
    });
  } catch(e){
    alert(e);
  }
}, false);

document.getElementById('saveButton').addEventListener('click', function() {
  chrome.storage.local.set({"savedWindow": parseInt(document.getElementById('targetWindow').value)}, function() {
    if (chrome.runtime.lastError) {
      throw chrome.runtime.lastError;
    } else {
      console.log('Saved!');
    }
  });
}, false);

document.getElementById('selectWindow').addEventListener('click', function() {
  var button = document.getElementById('selectWindow');
  button.style.background = "yellow";
  button.innerHTML = "Click a window";

  chrome.windows.onFocusChanged.addListener(selectCallback);
}, false);

function selectCallback(windowId) {
  chrome.storage.local.set({"savedWindow": windowId}, function() {
    if (chrome.runtime.lastError) {
      throw chrome.runtime.lastError;
    } else {
      chrome.windows.onFocusChanged.removeListener(selectCallback);
      var button = document.getElementById('selectWindow');
      button.style.background = "green";
      button.innerHTML = "Saved!";
      setTimeout(function() {
        var button = document.getElementById('selectWindow');
        button.innerHTML = "Select Target Window";
        button.style.background = "white";
      }, 3000);
    }
  })
}

document.getElementById('findWindow').addEventListener('click', function() {
  chrome.storage.local.get("savedWindow", function(storage) {
    chrome.windows.update(storage.savedWindow, {'focused': true});
  })
}, false);