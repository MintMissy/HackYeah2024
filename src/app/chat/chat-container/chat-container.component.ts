import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	signal,
	viewChild,
} from '@angular/core';
import { ChatActionChipComponent } from '../chat-action-chip/chat-action-chip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';
import { DraggableDirective } from '../../directive/draggable/draggable.directive';

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
	],
	templateUrl: './chat-container.component.html',
	styleUrl: './chat-container.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContainerComponent {
	readonly minimized = signal(true);
	readonly chatContainer =
		viewChild<ElementRef<HTMLDivElement>>('chatContainer');

	handleActionClick(message: string): void {}

	onSubmit(): void {
		const container = this.chatContainer()?.nativeElement;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}
}
