import {ChangeDetectionStrategy, Component, DestroyRef, inject, output, signal,} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {finalize, Subscription, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SpeechService} from '../../services/speech/speech.service';

@Component({
  selector: 'app-chat-footer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFooterComponent {
  readonly _fb = inject(FormBuilder);
  readonly _speechService = inject(SpeechService);
  readonly _destroyRef = inject(DestroyRef);

  readonly submit = output<string>();

  readonly form = this._fb.group({
    text: [''],
  });

  promptingText$?: Subscription;
  readonly promptingText = signal(false);

  handleMicrophone(): void {
    if (this.promptingText()) {
      this.promptingText$?.unsubscribe();
    } else {
      this.promptingText$ = this._speechService
        .speechToText()
        .pipe(
          tap((x) => console.log(x)),
          tap((text) => this.form.patchValue({text})),
          finalize(() => this.promptingText.set(false)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe();
    }

    this.promptingText.update((value) => !value);
  }

  onSubmit(): void {
    this.submit.emit(this.form.value.text!);
    this.form.reset();
  }
}
