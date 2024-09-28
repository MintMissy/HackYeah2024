import {
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
import { SpeechService } from '../services/speech/speech.service';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-chat-container',
	standalone: true,
	imports: [
		MatIcon,
		MatIconModule,
		ChatActionChipComponent,
		ReactiveFormsModule,
	],
	templateUrl: './chat-container.component.html',
	styleUrl: './chat-container.component.scss',
})
export class ChatContainerComponent {
	readonly _speechService = inject(SpeechService);
	readonly _destroyRef = inject(DestroyRef);

	readonly promptingText = signal(false);
	readonly inputField =
		viewChild.required<ElementRef<HTMLInputElement>>('input');

	readonly messageInputControl = new FormControl();

	handleActionClick(message: string): void {
		this.messageInputControl.setValue(message);
	}

	handleMicrophone(): void {
		this.promptingText.set(true);

		this._speechService
			.speechToText()
			.pipe(
				tap((text) => (this.inputField().nativeElement.value = text)),
				finalize(() => this.promptingText.set(false)),
				takeUntilDestroyed(this._destroyRef),
			)
			.subscribe();
	}
}
