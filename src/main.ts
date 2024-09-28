import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import {bootstrapApplication} from "@angular/platform-browser";

const ROOT_ELEMENT_TAG = 'app-root';

let rootElement = document.querySelector(ROOT_ELEMENT_TAG);

if (!rootElement) {
  rootElement = document.createElement(ROOT_ELEMENT_TAG);
  rootElement.id = 'wsparcio-extension';
  document.body.appendChild(document.createElement(ROOT_ELEMENT_TAG));
}

// platformBrowserDynamic()
//   .bootstrapModule(AppComponent)
//   .catch((err) => console.error(err));
bootstrapApplication(AppComponent)
