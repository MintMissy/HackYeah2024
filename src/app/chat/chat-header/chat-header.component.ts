import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-chat-header',
	standalone: true,
	imports: [],
	templateUrl: './chat-header.component.html',
	styleUrl: './chat-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeaderComponent {
	onAccessibility(): void {}

	onDialogMove(): void {}

	onDialogClose(): void {}
}
