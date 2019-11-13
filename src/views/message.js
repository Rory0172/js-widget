import html from './message.html';
import './message.sass';

let elements = [];
let body;

export function show(configurations) {
  let subdomain = configurations.subdomain;
  let styling = configurations.styling;
  let temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByTagName(
    'iframe'
  )[0].src = `http://${subdomain}.localhost:3001/widget`;

  let overlay = temporary.getElementsByClassName('js-widget-overlay')[0];
  switch (styling.overlay){
  case "light":
    overlay.className +="-light"
    break;
  case "dark":
    overlay.className +="-dark"
    break;
  }

  let dialog = temporary.getElementsByClassName('js-widget-dialog')[0];
  switch (styling.template){
  case "squared popup":
    if (styling.popup_side == 'left'){
      dialog.className += "-left";
    }
    if (styling.popup_side == 'right'){
      dialog.className += "-right";
    }
    break;
  case "vertical popup":
    if (styling.popup_position == 'top'){
      dialog.className += "-top";
    }
    if (styling.popup_position == 'bottom'){
      dialog.className += "-bottom";
    }
    break;
  }

  body = document.getElementsByTagName('body')[0];

  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  body.addEventListener('click', close);
}

export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener('click', close);
}
