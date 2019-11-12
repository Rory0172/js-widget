import html from './message.html';
import './message.css';

let elements = [];
let body;

export function show(subdomain) {
  let temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByTagName(
    'iframe'
  )[0].src = `http://${subdomain}.localhost:3001/widget`;
  let dialog = temporary.getElementsByClassName('js-widget-dialog')[0];
  dialog.style.cssText = 'width: 50%';

  body = document.getElementsByTagName('body')[0];

  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  body.addEventListener('click', close);
}

// export function addStyling(styling) {
//   let dialog = body.getElementsByClassName('js-widget-dialog')[0];
//   dialog.style.cssText = styling;
// }

export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener('click', close);
}

// function checkIframeLoaded() {
//   // Get a handle to the iframe element
//   var iframe = window.frames.legalsite;
//   var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//   // Check if loading is complete
//   if (iframeDoc.readyState == 'complete') {
//     //iframe.contentWindow.alert("Hello");
//     iframe.contentWindow.onload = function() {
//       alert('I am loaded');
//     };
//     // The loading is complete, call the function we want executed once the iframe is loaded
//     requestStyling();
//     return;
//   }

//   // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
//   window.setTimeout(checkIframeLoaded, 100);
// }

function requestStyling() {
  let win = window.frames.legalsite;
  win.postMessage('Can I get some popup styling?', '*');
  console.log('Widget send styling request.');
}
