// // popup.js
// document.getElementById('saveTabs').addEventListener('click', saveTabs);
// document.getElementById('restoreTabs').addEventListener('click', restoreTabs);
// document.getElementById('deleteGroup').addEventListener('click', deleteGroup);
// document.getElementById('searchTabs').addEventListener('input', searchTabs);

// function saveTabs() {
//   const groupName = document.getElementById('groupName').value || 'Default Group';
//   const closeAfterSave = document.getElementById('closeAfterSave').checked;

//   chrome.tabs.query({currentWindow: true}, function(tabs) {
//     let tabsToSave = tabs.map(tab => ({
//       url: tab.url,
//       title: tab.title,
//       favicorn: tab.favicorn
//     }));

//     chrome.storage.sync.get({tabGroups: {}}, function(data) {
//       data.tabGroups[groupName] = tabsToSave;
//       chrome.storage.sync.set({tabGroups: data.tabGroups}, function() {
//         updateGroupList();
//         updateSavedGroupsList();

//         if (closeAfterSave) {
//           chrome.tabs.query({currentWindow: true}, function(tabs) {
//             let tabIds = tabs.map(tab => tab.id);
//             chrome.tabs.remove(tabIds);
//           });
//         }
//       });
//     });
//   });
// }

// function restoreTabs() {
//   const groupSelect = document.getElementById('groupSelect');
//   const selectedGroup = groupSelect.value;

//   chrome.storage.sync.get({tabGroups: {}}, function(data) {
//     if (data.tabGroups[selectedGroup]) {
//       data.tabGroups[selectedGroup].forEach(tab => {
//         chrome.tabs.create({url: tab.url});
//       });
//     }
//   });
// }

// function deleteGroup() {
//   const groupSelect = document.getElementById('groupSelect');
//   const selectedGroup = groupSelect.value;

//   chrome.storage.sync.get({tabGroups: {}}, function(data) {
//     delete data.tabGroups[selectedGroup];
//     chrome.storage.sync.set({tabGroups: data.tabGroups}, function() {
//       updateGroupList();
//       updateSavedGroupsList();
//     });
//   });
// }

// function searchTabs() {
//   const searchTerm = document.getElementById('searchTabs').value.toLowerCase();
//   const searchResults = document.getElementById('searchResults');
//   searchResults.innerHTML = '';

//   if (searchTerm.length < 2) return;

//   chrome.storage.sync.get({tabGroups: {}}, function(data) {
//     for (let group in data.tabGroups) {
//       data.tabGroups[group].forEach(tab => {
//         if (tab.title.toLowerCase().includes(searchTerm) || tab.url.toLowerCase().includes(searchTerm)) {
//           let div = document.createElement('div');
//           div.textContent = `${group}: ${tab.title}`;
//           div.className = 'search-result';
//           div.addEventListener('click', () => chrome.tabs.create({url: tab.url}));
//           searchResults.appendChild(div);
//         }
//       });
//     }
//   });
// }

// function updateGroupList() {
//   const groupSelect = document.getElementById('groupSelect');
//   groupSelect.innerHTML = '';

//   chrome.storage.sync.get({tabGroups: {}}, function(data) {
//     for (let group in data.tabGroups) {
//       let option = document.createElement('option');
//       option.value = group;
//       option.textContent = group;
//       groupSelect.appendChild(option);
//     }
//   });
// }

// function updateSavedGroupsList() {
//   const savedGroupsDiv = document.getElementById('savedGroups');
//   savedGroupsDiv.innerHTML = '';

//   chrome.storage.sync.get({tabGroups: {}}, function(data) {
//     for (let group in data.tabGroups) {
//       let groupDiv = document.createElement('div');
//       groupDiv.className = 'group';
      
//       let groupTitle = document.createElement('h3');
//       groupTitle.textContent = group;
//       groupDiv.appendChild(groupTitle);

//       let tabList = document.createElement('ul');
//       data.tabGroups[group].forEach(tab => {
//         let li = document.createElement('li');
//         li.textContent = tab.title;
//         let groupImg = document.createElement('img');
//         groupImg.src = tab.favicorn 
//         tabList.appendChild(li);
//       });
//       groupDiv.appendChild(tabList);

//       savedGroupsDiv.appendChild(groupDiv);
//     }
//   });
// }

// updateGroupList();
// updateSavedGroupsList();

document.getElementById('saveTabs').addEventListener('click', saveTabs);
document.getElementById('restoreTabs').addEventListener('click', restoreTabs);
document.getElementById('deleteGroup').addEventListener('click', deleteGroup);
document.getElementById('searchTabs').addEventListener('input', searchTabs);

function saveTabs() {
  const groupName = document.getElementById('groupName').value || 'Default Group';
  const closeAfterSave = document.getElementById('closeAfterSave').checked;

  chrome.tabs.query({currentWindow: true}, function(tabs) {
    let tabsToSave = tabs.map(tab => ({
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl
    }));

    chrome.storage.sync.get({tabGroups: {}}, function(data) {
      data.tabGroups[groupName] = tabsToSave;
      chrome.storage.sync.set({tabGroups: data.tabGroups}, function() {
        updateGroupList();
        updateSavedGroupsList();

        if (closeAfterSave) {
          chrome.tabs.query({currentWindow: true}, function(tabs) {
            let tabIds = tabs.map(tab => tab.id);
            chrome.tabs.remove(tabIds);
          });
        }
      });
    });
  });
}

function restoreTabs() {
  const groupSelect = document.getElementById('groupSelect');
  const selectedGroup = groupSelect.value;

  chrome.storage.sync.get({tabGroups: {}}, function(data) {
    if (data.tabGroups[selectedGroup]) {
      data.tabGroups[selectedGroup].forEach(tab => {
        chrome.tabs.create({url: tab.url});
      });
    }
  });
}

function deleteGroup() {
  const groupSelect = document.getElementById('groupSelect');
  const selectedGroup = groupSelect.value;

  chrome.storage.sync.get({tabGroups: {}}, function(data) {
    delete data.tabGroups[selectedGroup];
    chrome.storage.sync.set({tabGroups: data.tabGroups}, function() {
      updateGroupList();
      updateSavedGroupsList();
    });
  });
}

function removeTab(groupName, tabIndex) {
  chrome.storage.sync.get({tabGroups: {}}, function(data) {
    if (data.tabGroups[groupName]) {
      data.tabGroups[groupName].splice(tabIndex, 1);
      if (data.tabGroups[groupName].length === 0) {
        delete data.tabGroups[groupName];
      }
      chrome.storage.sync.set({tabGroups: data.tabGroups}, function() {
        updateGroupList();
        updateSavedGroupsList();
      });
    }
  });
}

// function searchTabs() {
//   const searchTerm = document.getElementById('searchTabs').value.toLowerCase();
//   const searchResults = document.getElementById('searchResults');
//   searchResults.innerHTML = '';

//   if (searchTerm.length < 2) return;

//   chrome.storage.sync.get({tabGroups: {}}, function(data) {
//     for (let group in data.tabGroups) {
//       data.tabGroups[group].forEach(tab => {
//         if (tab.title.toLowerCase().includes(searchTerm) || tab.url.toLowerCase().includes(searchTerm)) {
//           let div = document.createElement('div');
//           div.className = 'search-result';
//           div.innerHTML = `<img src="${tab.favIconUrl || 'favicon.ico'}" width="16" height="16"> ${group}: ${tab.title}`;
//           div.addEventListener('click', () => chrome.tabs.create({url: tab.url}));
//           searchResults.appendChild(div);
//         }
//       });
//     }
//   });
// }

function updateGroupList() {
  const groupSelect = document.getElementById('groupSelect');
  groupSelect.innerHTML = '';

  chrome.storage.sync.get({tabGroups: {}}, function(data) {
    for (let group in data.tabGroups) {
      let option = document.createElement('option');
      option.value = group;
      option.textContent = group;
      groupSelect.appendChild(option);
    }
  });
}

function updateSavedGroupsList() {
  const savedGroupsDiv = document.getElementById('savedGroups');
  savedGroupsDiv.innerHTML = '';

  chrome.storage.sync.get({tabGroups: {}}, function(data) {
    for (let group in data.tabGroups) {
      let groupDiv = document.createElement('div');
      groupDiv.className = 'group';
      
      let groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      
      let groupHeaderText = document.createElement('p');
      groupHeaderText.textContent = `${group} (${data.tabGroups[group].length})`;
      let groupHeaderArr = document.createElement('span');
      groupHeaderArr.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16L8 12H16L12 16Z" fill="currentColor"/>
        </svg>
      `;
      groupHeader.appendChild(groupHeaderText);
      groupHeader.appendChild(groupHeaderArr);
      groupHeader.addEventListener('click', function() {
        let content = this.nextElementSibling;
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
      });
      groupDiv.appendChild(groupHeader);

      let groupContent = document.createElement('div');
      groupContent.className = 'group-content';
      groupContent.style.display = 'none'; // Initially hide the content
      data.tabGroups[group].forEach((tab, index) => {
        let tabDiv = document.createElement('div');
        tabDiv.className = 'tab-item';
        tabDiv.innerHTML = `
          <img src="${tab.favIconUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVQ4y6WTzwoBYRTFf5MyFkrYKAvZ2FrK1iOMlRn5C8xbUBY2lvIWLG2ETHkC9h7Ar0gWY+FnwddMTWMy5XfqW3zfOd3z3Xtvz/O8H8RjVJoURgA4LgLO5BFgo8AugCvgaSO1ZTtQEsA2sJFxCmwBJ3nO9aG0IgbsCJzFQ+Ag2AQBBWAnmMoAsAeWsAZBDoLdMJCHEwCj4ArsY/kCFAXQ+CJdGMjYBEaAFZPxAEwZzMJMIANzBSQV2ehhogSmQK9xHyYCEJZ4FHQKrONWHfuVm5PkTSAULGpbWVJJIkF7YAz0AzXZboBrNkFSiA8U1gFPlVAuEgAAAABJRU5ErkJggg=='}">
          <span class="tab-title">${tab.title}</span>
          <button class="remove-tab">Remove</button>
        `;
        tabDiv.querySelector('.remove-tab').addEventListener('click', () => removeTab(group, index));
        groupContent.appendChild(tabDiv);
      });
      groupDiv.appendChild(groupContent);

      savedGroupsDiv.appendChild(groupDiv);
    }
  });
}



function searchTabs() {
  const searchTerm = document.getElementById('searchTabs').value.toLowerCase();
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  if (searchTerm.length < 2) return;

  chrome.storage.sync.get({tabGroups: {}}, function(data) {
    for (let group in data.tabGroups) {
      data.tabGroups[group].forEach(tab => {
        if (tab.title.toLowerCase().includes(searchTerm) || tab.url.toLowerCase().includes(searchTerm)) {
          let div = document.createElement('div');
          div.className = 'search-result';
          div.innerHTML = `<img src="${tab.favIconUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVQ4y6WTzwoBYRTFf5MyFkrYKAvZ2FrK1iOMlRn5C8xbUBY2lvIWLG2ETHkC9h7Ar0gWY+FnwddMTWMy5XfqW3zfOd3z3Xtvz/O8H8RjVJoURgA4LgLO5BFgo8AugCvgaSO1ZTtQEsA2sJFxCmwBJ3nO9aG0IgbsCJzFQ+Ag2AQBBWAnmMoAsAeWsAZBDoLdMJCHEwCj4ArsY/kCFAXQ+CJdGMjYBEaAFZPxAEwZzMJMIANzBSQV2ehhogSmQK9xHyYCEJZ4FHQKrONWHfuVm5PkTSAULGpbWVJJIkF7YAz0AzXZboBrNkFSiA8U1gFPlVAuEgAAAABJRU5ErkJggg=='}" width="16" height="16"> ${group}: ${tab.title}`;
          div.addEventListener('click', () => chrome.tabs.create({url: tab.url}));
          searchResults.appendChild(div);
        }
      });
    }
  });
}


updateGroupList();
updateSavedGroupsList();
