import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatContainerComponent } from './chat/chat-container/chat-container.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ChatContainerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
	// constructor(private matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
	//
	// }
}
