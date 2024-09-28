import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatContainerComponent} from "./chat-container/chat-container.component";
import {MatIconRegistry} from "@angular/material/icon";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatContainerComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
  // constructor(private matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
  //
  // }
}

