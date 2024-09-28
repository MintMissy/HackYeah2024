import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, Subscription, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpeechService } from '../../services/speech/speech.service';

@Component({
	selector: 'app-chat-footer',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './chat-footer.component.html',
	styleUrl: './chat-footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFooterComponent {
	readonly _speechService = inject(SpeechService);
	readonly _destroyRef = inject(DestroyRef);

	promptingText$?: Subscription;
	readonly promptingText = signal(false);
	readonly messageInputControl = new FormControl();

	handleMicrophone(): void {
		if (this.promptingText()) {
			this.promptingText$?.unsubscribe();
		} else {
			this.promptingText$ = this._speechService
				.speechToText()
				.pipe(
					tap((text) => this.messageInputControl.setValue(text)),
					finalize(() => this.promptingText.set(false)),
					takeUntilDestroyed(this._destroyRef),
				)
				.subscribe();
		}

		this.promptingText.update((value) => !value);
	}

	onSubmit(): void {}
}
