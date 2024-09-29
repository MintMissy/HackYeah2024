import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
	name: 'message',
	standalone: true,
})
export class MessagePipe implements PipeTransform {
	private readonly _sanitizer = inject(DomSanitizer);

	transform(message: string): SafeHtml {
		return this._sanitizer.bypassSecurityTrustHtml(
			message
				.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
				.replace(/\n/g, '<br>'),
		);
	}
}
