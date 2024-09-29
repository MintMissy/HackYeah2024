import { Directive, ElementRef, inject, signal } from '@angular/core';

interface Coordinates {
	x: number;
	y: number;
}

@Directive({
	selector: '[appDraggable]',
	standalone: true,
	host: {
		'[style.position]': '"fixed"',
		'[style.left.px]': 'left()',
		'[style.top.px]': 'top()',
	},
})
export class DraggableDirective {
	readonly _element = inject(ElementRef);

	readonly offset = signal<Coordinates>({ x: 0, y: 0 });
	readonly left = signal<number>(
		window.innerWidth - 24 - this._element.nativeElement.width,
	);
	readonly top = signal<number>(
		window.innerHeight - 24 - this._element.nativeElement.height,
	);

	onDragStart(x: number, y: number): void {
		const offsetX = x - this._element.nativeElement.offsetLeft;
		const offsetY = y - this._element.nativeElement.offsetTop;
		this.offset.set({ x: offsetX, y: offsetY });
	}

	onDrag(x: number, y: number): void {
		this.left.set(x - this.offset().x);
		this.top.set(y - this.offset().y);
	}
}
