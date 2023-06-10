  chrome.scripting.registerContentScripts([{
    id : "test",
    matches : [ "https://*.nytimes.com/*" ],
    runAt : "document_start",
    js : [ "contentScript.js" ],
  }]);
 

  
