import { ping } from './services'
import { show } from './views/message'

const supportedAPI = ['init', 'message']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */
function app(window) {
    console.log('JS-Widget starting');

    // set default configurations
    let configurations = {
        subdomain: ""
    };

    // all methods that were called till now and stored in queue
    // needs to be called now 
    let globalObject = window[window['JS-Widget']];
    let queue = globalObject.q;
    if (queue) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                console.log('JS-Widget started', configurations);
            }
        }
        window.addEventListener("message", receiveMessage, false);
        show(configurations.subdomain)
        
        let win = window.frames.legalsite;
        setTimeout(function(){ 
          win.postMessage("Heey iframe, how are you doing?", "*"); 
        }, 
        5000);
    }
}

function receiveMessage(event)
{
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  if (event.origin !== "http://startupz.legalsites.com:3000")
    return;

  console.log("Received in widget: " + event.data);
}

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

app(window);