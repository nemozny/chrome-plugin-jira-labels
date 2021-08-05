// Initialize butotn with users's prefered color
let QA = document.getElementById("QA");
let Doc = document.getElementById("Documentation");
let Star = document.getElementById("Startest");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

QA.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addQA,
  });
});

Doc.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addDoc,
  });
});

Star.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addStar,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

// function addLabels(label) {
//   let jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
//   let url = document.getElementsByName('ajs-base-url')[0].getAttribute('content')

//   var xhr = new XMLHttpRequest();
//   let endpoint = url + "/rest/api/2/issue/" + jira
//   xhr.open("PUT", endpoint)//, true);

//   //Send the proper header information along with the request
//   // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

//   xhr.onreadystatechange = function () { // Call a function when the state changes.
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//       // Request finished. Do processing here.
//       console.log(xhr.responseText);
//     }
//   }

//   body = {
//     "update":
//     {
//       "labels":
//         [
//           { "add": label }
//         ]
//     }
//   }
//   json = JSON.stringify(body)
//   xhr.send(json);

//   // jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
//   // console.log(jira)
// }

function addQA() {
  let label = "ManualTesting_NotRequired"
  function addLabels(label) {
    let jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
    let url = document.getElementsByName('ajs-base-url')[0].getAttribute('content')
  
    var xhr = new XMLHttpRequest();
    let endpoint = url + "/rest/api/2/issue/" + jira
    xhr.open("PUT", endpoint)//, true);
  
    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  
    xhr.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        console.log(xhr.responseText);
      }
    }
  
    body = {
      "update":
      {
        "labels":
          [
            { "add": label }
          ]
      }
    }
    json = JSON.stringify(body)
    xhr.send(json);
  
    // jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
    // console.log(jira)
  }
  addLabels(label)
}

function addStar() {
  let label = "QA-StarTest-Not-Required"
  function addLabels(label) {
    let jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
    let url = document.getElementsByName('ajs-base-url')[0].getAttribute('content')
  
    var xhr = new XMLHttpRequest();
    let endpoint = url + "/rest/api/2/issue/" + jira
    xhr.open("PUT", endpoint)//, true);
  
    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  
    xhr.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        console.log(xhr.responseText);
      }
    }
  
    body = {
      "update":
      {
        "labels":
          [
            { "add": label }
          ]
      }
    }
    json = JSON.stringify(body)
    xhr.send(json);
  
    // jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
    // console.log(jira)
  }
  addLabels(label)
}

function addDoc() {
  let label = "Documentation_NotRequired"
  function addLabels(label) {
    let jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
    let url = document.getElementsByName('ajs-base-url')[0].getAttribute('content')
  
    var xhr = new XMLHttpRequest();
    let endpoint = url + "/rest/api/2/issue/" + jira
    xhr.open("PUT", endpoint)//, true);
  
    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  
    xhr.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        console.log(xhr.responseText);
      }
    }
  
    body = {
      "update":
      {
        "labels":
          [
            { "add": label }
          ]
      }
    }
    json = JSON.stringify(body)
    xhr.send(json);
  
    // jira = document.getElementsByName('ajs-issue-key')[0].getAttribute('content')
    // console.log(jira)
  }
  addLabels(label)
}