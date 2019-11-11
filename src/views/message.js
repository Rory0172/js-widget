import html from './message.html';
import './message.css';

let elements = [];
let body;

export function show(subdomain) {
  let temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByTagName('iframe')[0].src = `http://${subdomain}.legalsites.app/widget`;
  let dialog = temporary.getElementsByClassName('js-widget-dialog')[0];
  dialog.style.cssText = 'margin-left: 50%;';

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
