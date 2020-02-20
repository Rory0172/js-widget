import html from './message.html';
import './message.sass';

let elements = [];
let body;
let dialog;

export function show(configurations) {
  let subdomain = configurations.subdomain;
  let styling = configurations.styling;
  let uuid = configurations.uuid;

  let temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByTagName(
    'iframe'
  )[0].src = `http://localhost:3001/widget/${uuid}`;

  dialog = temporary.getElementsByClassName('js-widget-dialog')[0];
  styling.template = "squared popup"
  styling.popup_side = "right"
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
  let html_object = document.getElementsByTagName('html')[0];

  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  body.addEventListener('click', close);
  html_object.addEventListener('click', close);
}

export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener('click', close);
}
