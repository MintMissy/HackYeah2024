import { Component } from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ChatActionChipComponent} from "../chat-action-chip/chat-action-chip.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat-container',
  standalone: true,
    imports: [
        MatIcon,
        MatIconModule,
        ChatActionChipComponent,
        ReactiveFormsModule
    ],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {

    messageInputControl = new FormControl();

    handleActionClick(message: string): void {
        this.messageInputControl.setValue(message);
    }
}
