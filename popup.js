let QA = document.getElementById("QA");
let Doc = document.getElementById("Documentation");
let Star = document.getElementById("Startest");
let Customer = document.getElementById("Customer");
let Infra = document.getElementById("Infra");
let Visible = document.getElementById("Visible");
let Invisible = document.getElementById("Invisible");



async function restore_options() {
  let result = null;
  result = await chrome.storage.sync.get(["workCategory"]);
  let work_category = result.workCategory;
  result = await chrome.storage.sync.get(["featureType"]);
  let feature_type = result.featureType;

  return [work_category, feature_type];
};

function updateTicket(payload) {
  let jira = null;
  let url = null;

  // On-premise
  jira = document.getElementsByName('ajs-issue-key');
  if(typeof(jira) != 'undefined' && jira.length > 0) {
    jira = jira[0];
  } else {
    jira = null;
  }

  // data-issue-key should be used when editing with in a filters window
  if(jira == null) {
    jira = document.getElementById("s-helper-panel-content");
    if(jira != null && jira.length > 0) {
      jira = jira.getAttribute('data-issue-key');
    } else {
      jira = null;
    }
  }
  
  // if(typeof(jira) == 'undefined') {
  //   jira = jira.getAttribute('content');
  // }

  // Switch to cloud Jira
  if(jira == null) {
    title = document.title;
    let issue_key = title.match(/\[(.+)\]/i);
    if (issue_key.length > 0) {
      jira = issue_key[1];
    } else {
      jira = null;
    }
  }

  // On-premise
  url = document.getElementsByName('ajs-base-url');
  if (typeof(url) != 'undefined' && url.length > 0) {
    url = url[0].getAttribute('content');
  } else {
    url = null;
  }

  // Switch to cloud Jira
  if (url == null) {
    url = document.baseURI;
    let base_url = url.match(/(https:\/\/[^/]+)/i);
    if (typeof(base_url) != 'undefined' && base_url.length > 0) {
      url = base_url[1];
    } else {
      url = null;
    }
  }

  if (jira == null || url == null) {
    console.log("Not in Jira");
    return;
  }

  function handleEvent(e) {
    window.location.reload();
  }

  function addListeners(xhr) {
    xhr.addEventListener("loadend", handleEvent);
  }

  const xhr = new XMLHttpRequest();
  addListeners(xhr);

  let endpoint = url + "/rest/api/2/issue/" + jira;
  xhr.open("PUT", endpoint);

  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
      // console.log(xhr.responseText);
      
    } else {
      let text = null;
      try {
        text = JSON.parse(xhr.responseText);
      } catch (e) {};

      if (text != null && "errors" in text) {
        alert(JSON.stringify(text["errors"]));
      }
    }
  };

  json = JSON.stringify(payload);
  xhr.send(json);
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
  [work_category, feature_type] = await restore_options();
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
          [work_category] : {"value" : "Development"},
          [feature_type] : {"value" : "Customer Feature"}
      }
    }]
  });
});

Infra.addEventListener("click", async () => {
  [work_category, feature_type] = await restore_options();
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
          [work_category] : {"value" : "Development"},
          [feature_type] : {"value" : "Infrastructure/Framework"}
      }
    }]
  });
});

Visible.addEventListener("click", async () => {
  [work_category, feature_type] = await restore_options();
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
          [work_category] : {"value" : "Development"},
          [feature_type] : {"value" : "Refactoring Customer Visible"}
      }
    }]
  });
});

Invisible.addEventListener("click", async () => {
  [work_category, feature_type] = await restore_options();
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
          [work_category] : {"value" : "Development"},
          [feature_type] : {"value" : "Refactoring Non-Customer Visible"}
      }
    }]
  });
});

document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});