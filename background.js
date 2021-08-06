// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
// 	// console.log('(background.js) message recieved: '+request.message);
//     if( request.message === "reload" ) {
// 		// chrome.tabs.getSelected(null, function(tab) {
// 		//   var code = 'window.location.reload(true);';
// 		//   chrome.tabs.executeScript(tab.id, {code: code});
// 		// });
//       window.location.reload();
//     }
// });