import { ping } from './services';
import { show } from './views/message';

const supportedAPI = ['init', 'message']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */
function app(window) {
  console.log('JS-Widget starting');

  // set default configurations
  let configurations = {
    uuid: '',
    type: 'all-in-one',
    subdomain: ''
  };

  let globalObject = window[window['JS-Widget']];
  let queue = globalObject.q;
  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() == 'init') {
        configurations = extendObject(configurations, queue[i][1]);
        console.log('JS-Widget started', configurations);
      }
    }
  }

  let request = new Request(
    `https://legalsites-widget.s3.eu-central-1.amazonaws.com/${configurations.uuid}.json`
  );
  const response = fetch(request)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Work with JSON data here
      // all methods that were called till now and stored in queue
      // needs to be called now
      let styling = data.styling;
      let subdomain = data.subdomain;
      configurations = { ...configurations, styling, subdomain };
      console.log(configurations);
      window.addEventListener('message', receiveMessage, false);
      show(configurations);
    })
    .catch(err => {
      // Do something for an error here
      console.log(err);
    });
}

function receiveMessage(event) {
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  console.log(event.origin);
  if (event.origin !== 'http://legalsites.app') return;

  console.log('Received in widget: ' + event.data);
  addStyling(event.data);
}

function extendObject(a, b) {
  for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
  return a;
}

app(window);
