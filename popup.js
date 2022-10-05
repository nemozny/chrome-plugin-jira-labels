let QA = document.getElementById("QA");
let Doc = document.getElementById("Documentation");
let Star = document.getElementById("Startest");
let Customer = document.getElementById("Customer");
let Infra = document.getElementById("Infra");
let Visible = document.getElementById("Visible");
let Invisible = document.getElementById("Invisible");

function updateTicket(payload) {
  let url = document.getElementsByName('ajs-base-url')[0].getAttribute('content');
  let jira = document.getElementsByName('ajs-issue-key')[0];

  // data-issue-key should be used when editing with in a filters window
  if(typeof(jira) == 'undefined') {
    jira = document.getElementById("s-helper-panel-content").getAttribute('data-issue-key');
  } else {
    jira = jira.getAttribute('content');
  }

  if (typeof(jira) == 'undefined' || typeof(url) == 'undefined') {
    console.log("Not in Jira");
    return;
  }

  var xhr = new XMLHttpRequest();
  let endpoint = url + "/rest/api/2/issue/" + jira;
  xhr.open("PUT", endpoint);

  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
      // console.log(xhr.responseText);
    }
  };

  json = JSON.stringify(payload);
  xhr.send(json);

  window.location.reload();
}

QA.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "ManualTesting_NotRequired" }
          ]
      }
    }]
  });
});

Doc.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "Documentation_NotRequired" }
          ]
      }
    }]
  });
});

Star.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "QA-AutomatedTest-Not-Required" }
          ]
      }
  }]
  });
});

Customer.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "Documentation_NotRequired" },
            { "add": "QA-AutomatedTest-Not-Required" },
            { "add": "ManualTesting_NotRequired" }
          ]
      },
      "fields" : {
          "customfield_12770" : {"value" : "Development"},
          "customfield_15470" : {"value" : "Refactoring Non-Customer Visible"}
      }
    }]
  });
});

Infra.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "QA-AutomatedTest-Not-Required" },
            { "add": "ManualTesting_NotRequired" }
          ]
      },
      "fields" : {
          "customfield_12770" : {"value" : "Development"},
          "customfield_15470" : {"value" : "Infrastructure/Framework"}
      }
    }]
  });
});

Visible.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "Documentation_NotRequired" },
            { "add": "QA-AutomatedTest-Not-Required" },
            { "add": "ManualTesting_NotRequired" }
          ]
      },
      "fields" : {
          "customfield_12770" : {"value" : "Development"},
          "customfield_15470" : {"value" : "Refactoring Customer Visible"}
      }
    }]
  });
});

Invisible.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTicket,
    args: [{
      "update" : {
        "labels" : 
          [ 
            { "add": "QA-AutomatedTest-Not-Required" },
            { "add": "ManualTesting_NotRequired" }
          ]
      },
      "fields" : {
          "customfield_12770" : {"value" : "Development"},
          "customfield_15470" : {"value" : "Refactoring Non-Customer Visible"}
      }
    }]
  });
});