let QA = document.getElementById("QA");
let Doc = document.getElementById("Documentation");
let Star = document.getElementById("Startest");
let Large = document.getElementById("Large");
let Small = document.getElementById("Small");

function updateTicket(payload) {
  let jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
  let url = document.getElementsByName('ajs-base-url')[0].getAttribute('content')
  if (typeof(jira) == 'undefined' || typeof(url) == 'undefined') {
    console.log("Not in Jira");
    console.log(base_url);
    console.log(url);
    console.log(jira);
    return;
  }

  var xhr = new XMLHttpRequest();
  let endpoint = url + "/rest/api/2/issue/" + jira
  xhr.open("PUT", endpoint)

  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
      console.log(xhr.responseText);
    }
  }

  body = {
    "update": payload
  };
  json = JSON.stringify(body);
  xhr.send(json);

  window.location.reload();
}

QA.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "labels" : 
        [ 
          { "add": "ManualTesting_NotRequired" }
        ]
    }]
  });
});

Doc.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "labels" : 
        [ 
          { "add": "Documentation_NotRequired" }
        ]
    }]
  });
});

Star.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "labels" : 
        [ 
          { "add": "QA-AutomatedTest-Not-Required" }
        ]
    }]
  });
});

Large.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "labels" : 
        [ 
          { "add": "Documentation_NotRequired" },
          { "add": "QA-AutomatedTest-Not-Required" },
          { "add": "ManualTesting_NotRequired" }
        ]
    }]
  });
});

Small.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "labels" : 
        [ 
          { "add": "QA-AutomatedTest-Not-Required" },
          { "add": "ManualTesting_NotRequired" }
        ]
    }]
  });
});