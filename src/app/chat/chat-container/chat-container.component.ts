import {
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { ChatActionChipComponent } from '../chat-action-chip/chat-action-chip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { DraggableDirective } from '../../directive/draggable/draggable.directive';
import { NgForOf } from '@angular/common';
import { MessagePipe } from './message.pipe';

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
		MessagePipe,
	],
	templateUrl: './chat-container.component.html',
	styleUrl: './chat-container.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContainerComponent {
	messages = input.required<{ fromServer: boolean; message: string }[]>();
	actions = input.required<{ send: boolean; message: string }[]>();

	actionClicked = output<string>();
	messageSent = output<string>();

	readonly chatContainer =
		viewChild<ElementRef<HTMLDivElement>>('chatContainer');

	readonly minimized = signal(true);

	constructor() {
		effect(() => this.messages() && this._scrollToBottom());
	}

	handleActionClick(message: string): void {
		this.actionClicked.emit(message);
	}

	onSubmit(message: string): void {
		this._scrollToBottom();
		this.messageSent.emit(message);
	}

	private _scrollToBottom(): void {
		const container = this.chatContainer()?.nativeElement;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}
}
