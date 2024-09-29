import { DestroyRef, Directive, inject, signal } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
	selector: '[appDragHandle]',
	standalone: true,
	host: {
		'(mousedown)': 'onMouseDown($event)',
		'(mouseup)': 'onMouseUp($event)',
		'[style.cursor]': 'isDragging() ? "grabbing" : "grab"',
	},
})
export class DragHandleDirective {
	readonly draggableHost = inject(DraggableDirective);

	readonly isDragging = signal(false);

	constructor() {
		fromEvent<MouseEvent>(window, 'mousemove')
			.pipe(
				takeUntilDestroyed(inject(DestroyRef)),
				filter(() => this.isDragging()),
			)
			.subscribe(($event: MouseEvent) => this.onMouseMove($event));
	}

	onMouseDown($event: MouseEvent): void {
		this.isDragging.set(true);
		this.draggableHost.onDragStart($event.clientX, $event.clientY);
	}

	onMouseMove($event: MouseEvent): void {
		this.draggableHost.onDrag($event.clientX, $event.clientY);
	}

	onMouseUp(): void {
		this.isDragging.set(false);
	}
}
