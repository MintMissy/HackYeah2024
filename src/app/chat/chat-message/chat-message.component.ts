import {ChangeDetectionStrategy, Component, inject, input,} from '@angular/core';
import {SpeechService} from '../../services/speech/speech.service';

@Component({
	selector: 'app-chat-message',
	standalone: true,
	imports: [],
	templateUrl: './chat-message.component.html',
	styleUrl: './chat-message.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
	private readonly _speechService = inject(SpeechService);

  messages = input.required<{fromServer: boolean, message: string}>();

	onReadMessage(message: string): void {
		// TODO update text
		this._speechService.textToSpeech(message);
	}
}
