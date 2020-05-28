import html from "./message.html";
import "./message.sass";

let elements = [];
let body;
let dialog;

export function show(configurations) {
  var cookie = getCookie("privacy-cookie");
  console.log(cookie);
  console.log(document)
  if (cookie == "") {
    let subdomain = configurations.subdomain;
    let styling = configurations.styling;
    let uuid = configurations.uuid;

    let temporary = document.createElement("legalsite-widget");
    temporary.innerHTML = html;
    temporary.getElementsByClassName(
      "js-widget-iframe"
    )[0].src = `https://legalsites.app/widget/${uuid}`;

    dialog = temporary.getElementsByClassName("js-widget-dialog")[0];

    switch (styling.template) {
      case "squared popup":
        if (styling.popup_side == "left") {
          dialog.className += "-left";
        }
        if (styling.popup_side == "right") {
          dialog.className += "-right";
        }
        break;
      case "vertical popup":
        if (styling.popup_position == "top") {
          dialog.className += "-top";
        }
        if (styling.popup_position == "bottom") {
          dialog.className += "-bottom";
        }
        break;
    }

    body = document.getElementsByTagName("body")[0];

    while (temporary.children.length > 0) {
      elements.push(temporary.children[0]);
      body.appendChild(temporary.children[0]);
    }
    body.addEventListener("click", closeWidget);
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function closeWidget() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
}
export function setCookie() {
  var d = new Date();
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = "privacy-cookie" + "=" + true + ";" + expires + ";path=/";
}
