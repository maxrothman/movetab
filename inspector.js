document.addEventListener('DOMContentLoaded', bootStrap, false);
document.getElementById('refresh').addEventListener('click', bootStrap, false);
document.getElementById('moveButton').addEventListener('click', moveTab, false);


function loadWindowList() {
  chrome.windows.getAll({ populate: true }, function(windowList) {

    //TODO: remove
    console.log(windowList);
    
    var tab, html;
    var windowListEl = document.getElementById('windowList');
    
    html = '<ul>';
    for (var i = 0; i < windowList.length; i++) {
      windowList[i].current = (windowList[i].id == currentWindowId);
      windowList[i].focused = (windowList[i].id == focusedWindowId);

      html = html.concat('<li><b>' + windowList[i].id + '</b><ul>');

      for (var j = 0; j < windowList[i].tabs.length; j++) {
        tab = windowList[i].tabs[j]
        html = html.concat('<li>' + tab.id + ': <a href="' + tab.url + '">' + tab.title + '</a></li>');
      }
      html = html.concat('</ul></li>');
    }
    html = html.concat('</ul>');
    windowListEl.innerHTML = html;
  });
}

function bootStrap() {
  chrome.windows.getCurrent(function(currentWindow) {
    currentWindowId = currentWindow.id;
    chrome.windows.getLastFocused(function(focusedWindow) {
      focusedWindowId = focusedWindow.id;
      loadWindowList();
    });
  });
}

function moveTab() {
  data = getMoveData()
  try {
    chrome.tabs.move(data.from, data.to);
  } catch (e) {
    console.log(e);
  }
}

function getMoveData() {
  return {
    'from': parseInt(document.getElementById('fromTab').value),
    'to': {
      'windowId': parseInt(document.getElementById('toWindow').value),
      'index': -1
    }
  }
}