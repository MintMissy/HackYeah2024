import {ChangeDetectionStrategy, Component, ViewEncapsulation,} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MessageService} from "./services/api/message.service";
import {switchMap} from "rxjs";
import {MessagePayload} from "./domain/message-payload.interface";
import {ChatContainerComponent} from "./chat/chat-container/chat-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
  state = this.messageService._chatAssistantState();

  constructor(private readonly messageService: MessageService) {
    this.messageService.setUrl(window.location.href);
    this.fetchSiteInformation()
  }

  fetchSiteInformation() {
    this.messageService.fetchSiteInformation()
      .pipe(
        switchMap(() => {
          return this.messageService.initializeChatAssistant()
        })
      )
      .subscribe()
  }

  sendMessage(payload: MessagePayload) {
    this.messageService.sendMessage(payload,
      this.messageService._chatAssistantState().threadId,
      this.messageService._chatAssistantState().assistantId).subscribe();
  }
}
