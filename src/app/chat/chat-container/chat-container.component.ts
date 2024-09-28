import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	signal,
	viewChild,
} from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ChatActionChipComponent } from '../chat-action-chip/chat-action-chip.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { SpeechService } from '../../services/speech/speech.service';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';

@Component({
	selector: 'app-chat-container',
	standalone: true,
	imports: [
		MatIcon,
		MatIconModule,
		ChatActionChipComponent,
		ReactiveFormsModule,
		ChatMessageComponent,
		ChatHeaderComponent,
		ChatFooterComponent,
	],
	templateUrl: './chat-container.component.html',
	styleUrl: './chat-container.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContainerComponent {
	handleActionClick(message: string): void {}
}
