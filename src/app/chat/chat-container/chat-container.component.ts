import {ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild,} from '@angular/core';
import {ChatActionChipComponent} from '../chat-action-chip/chat-action-chip.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {ChatHeaderComponent} from '../chat-header/chat-header.component';
import {ChatFooterComponent} from '../chat-footer/chat-footer.component';
import {DraggableDirective} from '../../directive/draggable/draggable.directive';
import {NgForOf} from "@angular/common";

@Component({
	selector: 'app-chat-container',
	standalone: true,
  imports: [
    ChatActionChipComponent,
    ReactiveFormsModule,
    ChatMessageComponent,
    ChatHeaderComponent,
    ChatFooterComponent,
    DraggableDirective,
    NgForOf,
  ],
	templateUrl: './chat-container.component.html',
	styleUrl: './chat-container.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContainerComponent {
	readonly minimized = signal(true);
	readonly chatContainer =
		viewChild<ElementRef<HTMLDivElement>>('chatContainer');
  messages = input.required<{fromServer: boolean, message: string}[]>();
  actions = input.required<{send: boolean, message: string}[]>();
  actionClicked = output<string>();
  messageSent = output<string>();

	handleActionClick(message: string): void {
    this.actionClicked.emit(message);
  }

	onSubmit(message: string): void {
    console.log(message)
		const container = this.chatContainer()?.nativeElement;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
    this.messageSent.emit(message);
	}
}
