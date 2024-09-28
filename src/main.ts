import {AppComponent} from './app/app.component';
import {bootstrapApplication} from "@angular/platform-browser";
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

const ROOT_ELEMENT_TAG = 'app-root';

let rootElement = document.querySelector(ROOT_ELEMENT_TAG);

if (!rootElement) {
  rootElement = document.createElement(ROOT_ELEMENT_TAG);
  rootElement.id = 'wsparcio-extension';
  document.body.appendChild(document.createElement(ROOT_ELEMENT_TAG));
}

bootstrapApplication(AppComponent, {
  providers: [provideExperimentalZonelessChangeDetection(), provideHttpClient(withInterceptorsFromDi())]
})
