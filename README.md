# Introduction
This is a Chrome plugin that you can add using the Chrome Developer mode (not from the Chrome store). You need to use the Developer mode since there are no user options at the moment (and no planned).

Please see [https://developer.chrome.com/docs/extensions/mv3/getstarted/](https://developer.chrome.com/docs/extensions/mv3/getstarted/) on how to enable the Developer mode.

## Update
Now with Jira Cloud support!

## How does it work
This plugin parses the page you have open in Chrome and searches for Jira metadata. If you open the source for any Jira ticket, you will find this
```html
    <meta name="ajs-base-url" content="https://jira.domain.com">
    <meta name="ajs-issue-key" content="ABC-1234">
```
This plugin parses these meta fields for your Jira URL and Jira ticket key. Then it constructs the REST endpoint for updating the ticket.

In the case of Cloud Jira the plugin parses
```
document.title
```
to get the issue key and
```
document.baseURI
```
to get the Jira URL.

When you click a button to update the labels, the plugin will call the REST endpoint with your preconfigured payload.
```js
    args: [{
      "labels" : 
        [ 
          { "add": "QA-AutomatedTest-Not-Required" }
        ]
    }]
```


## Configuration
Checkout the code, open your favorite editor and change

* [popup.html](https://github.com/nemozny/chrome-plugin-jira-labels/blob/master/popup.html) - Add your buttons. Change that silly title and picture.
* [popup.js](https://github.com/nemozny/chrome-plugin-jira-labels/blob/master/popup.js) - Change HTML functions related to your buttons and enter your Jira labels. You may need to change the endpoint too, based on your Jira instance (server/cloud and version dependent) - "/rest/api/2/issue/".

Plus edit the configuration file in *options.js* and *options.html*.

## Set up your custom variables
Click Options and enter values for your custom variables.

## Enable the plugin
Load the plugin in the Chrome Developer mode.

Click the plugin and enjoy!


## Credits
See the [contributors](https://github.com/nemozny/chrome-plugin-jira-labels/pulse).

## License
The MIT License (MIT)
Copyright © 2022 nemozny@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.