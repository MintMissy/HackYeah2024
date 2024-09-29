import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

@Component({
	selector: 'app-chat-action-chip',
	standalone: true,
	imports: [],
	templateUrl: './chat-action-chip.component.html',
	styleUrl: './chat-action-chip.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatActionChipComponent {
	actionTitle = input.required<string>();
	selected = input.required<boolean>();

	actionClicked = output<string>();
}
