import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-chat-action-chip',
  standalone: true,
  imports: [],
  templateUrl: './chat-action-chip.component.html',
  styleUrl: './chat-action-chip.component.scss'
})
export class ChatActionChipComponent {
  actionTitle = input.required<string>();
  actionClicked = output<string>();
}
