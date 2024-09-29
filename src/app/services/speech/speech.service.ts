import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SpeechService {
	private readonly _speechRecognition =
		(<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
	private readonly DEACTIVATE_SILENCE_DURATION = 2000;
	private readonly LANG = 'pl-PL';

	speechToText(): Observable<string> {
		const recognition = new this._speechRecognition();

		recognition.lang = this.LANG;
		recognition.interimResults = false;
		recognition.start();

		let lastSpoken = Date.now();
		let spokenText = '';

		return new Observable((subscriber) => {
			recognition.onresult = (event: any) => {
				const transcript = event.results[0][0].transcript;

				lastSpoken = Date.now();
				spokenText += (spokenText + ' ' + transcript).trim();

				subscriber.next(spokenText);
			};

			recognition.onend = () => {
				const isStillSpeaking =
					Date.now() - lastSpoken < this.DEACTIVATE_SILENCE_DURATION;

				if (isStillSpeaking) {
					recognition.start();
				} else {
					subscriber.next(spokenText);
					subscriber.complete();
				}
			};
		});
	}

	textToSpeech(text: string): void {
		const vocalWelcome = new SpeechSynthesisUtterance(text);

		vocalWelcome.lang = this.LANG;
		vocalWelcome.pitch = 3;
		vocalWelcome.rate = 1;

		window.speechSynthesis.speak(vocalWelcome);
	}
}
