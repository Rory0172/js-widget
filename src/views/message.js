import html from './message.html';
import './message.scss';

let elements = [];
let body;

export function show(configurations) {
  let subdomain = configurations.subdomain;
  let styling = configurations.styling;
  console.log(configurations);
  let temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByTagName(
    'iframe'
  )[0].src = `http://${subdomain}.localhost:3001/widget`;
  let dialog = temporary.getElementsByClassName('js-widget-dialog')[0];
  dialog.className += "-top";
  // switch (styling.template){
  // case "squared popup":
  //   if (styling.popup_side == 'left'){
  //     dialog.classList.add("-left");
  //   }
  //   if (styling.popup_side == 'right'){
  //     dialog.classList.add("-right");
  //   }
  //   break;
  // case "vertical popup":
  //   if (styling.popup_position == 'top'){
  //     dialog.classList.add("-top")
  //   }
  //   if (styling.popup_position == 'bottom'){
  //     dialog.classList.add("-bottom");
  //   }
  //   break;
  // }

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

