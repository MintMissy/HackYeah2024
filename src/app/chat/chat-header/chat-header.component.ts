import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { DragHandleDirective } from '../../directive/draggable/drag-handle.directive';

@Component({
	selector: 'app-chat-header',
	standalone: true,
	imports: [DragHandleDirective],
	templateUrl: './chat-header.component.html',
	styleUrl: './chat-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeaderComponent {
	readonly close = output<void>();

	onAccessibility(): void {}

	onDialogMove(): void {}
}
