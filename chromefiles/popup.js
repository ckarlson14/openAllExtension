console.log("loaded openAll");
window.onload = function () {
  document.getElementById("openAll").addEventListener("click", openAll);
  document
    .getElementById("openBookmarks")
    .addEventListener("click", openBookmarks);
  document.getElementById("openFolders").addEventListener("click", openFolders);
  var chris = document.getElementById("openChris")
    chris.addEventListener("click", openTwitter);
  chris.param = chris.href
  var ian = document.getElementById("openIan")
  ian.addEventListener("click", openTwitter);
  ian.param = ian.href

  chrome.bookmarks.getTree(function (itemTree) {
    itemTree.forEach(function (item) {
      processNode(item);
    });

    if (folderCount === false){
        document.getElementById("openFolders").style.display = "none";
        document.getElementById("section2").style.display = "none";
        document.getElementById("openBookmarks").classList.remove("margin-bottom");
    }
  });
};

var folderCount = false

function processNode(node) {
  console.log(node);
  var num = 0;
  // recursively process child nodes
  if (
    node.children &&
    node.title != "Bookmarks Bar" &&
    node.title != "Bookmarks" &&
    node.title != "Other Bookmarks" &&
    node.title
  ) {

    addFolder(node, num);
    folderCount = true
    num++;
  } else if (node.children) {
    node.children.forEach(function (child) {
      processNode(child);
    });
  }
}

function addUrl(node) {
  var el = document.getElementById("list");
  var il = document.createElement("div");
  var link = document.createElement("a");
  if (node.title) {
    link.innerText = node.title;
  } else {
    link.innerText = node.url;
  }
  link.setAttribute("href", node.url);
  link.addEventListener("click", open);
  link.param = node.url;
  il.style.marginLeft = "0px";
  il.appendChild(link);
  el.appendChild(il);
}

function addFolder(node, num) {
  if (node.children) {
    var el = document.getElementById("list2");
    var il = document.createElement("div");
    var link = document.createElement("a");
    if (node.title) {
      link.innerText = node.title;
    } else {
      link.innerText = node.url;
    }
    link.addEventListener("click", function () {
      openFolder(node.id);
    });
    link.setAttribute("class", "folder-item-text");
    il.setAttribute("class", "folder-item");
    link.setAttribute("href", "/index.html");
    il.appendChild(link);
    el.appendChild(il);
    node.children.forEach(function (child) {
      addFolder(child, num + 1);
    });
  }
}

function openNode(node) {

  // recursively process child nodes
  if (node.children) {
    node.children.forEach(async function (child) {
      openNode(child);
    });
  }
  // print leaf nodes URLs to console
  if (node.url) {
    chrome.tabs.create({ url: node.url });
  }
}

function openFolder(id) {
  chrome.bookmarks.getChildren(id, function (itemTree) {
    itemTree.forEach(async function (item) {
      openNode(item);
    });
  });
}

function openAll() {
  chrome.bookmarks.getTree(function (itemTree) {
    itemTree.forEach(function (item) {
      openNode(item);
    });
  });
}


function openBookmarks() {
  chrome.bookmarks.getTree(function (itemTree) {
    itemTree.forEach(function (item) {
      openBookmarkNode(item);
    });
  });
}

function openBookmarkNode(node) {
  // recursively process child nodes
  if (
    node.children &&
    node.title != "Bookmarks" &&
    node.title != "Bookmarks Bar" &&
    node.title != "Other Bookmarks" &&
    node.title
  ) {
  } else if (node.children) {
    node.children.forEach(function (child) {
      openBookmarkNode(child);
    });
  }

  if (node.url) {
    openNode(node);
  }
}

function openFolders() {
  chrome.bookmarks.getTree(function (itemTree) {
    itemTree.forEach(function (item) {
      openFoldersNode(item);
    });
  });
}

function openFoldersNode(node) {
  if (node.children) {
    node.children.forEach(function (child) {
      openFoldersNode(child);
    });
  }
  if (node.url && node.parentId != 1) {
    openNode(node);
  }
}

function open(evt) {
  var id = evt.target.href;
  chrome.tabs.create({ url: id });
}

function openTwitter(evt){
    var id = evt.target.href;
  chrome.tabs.create({ url: id });
}

