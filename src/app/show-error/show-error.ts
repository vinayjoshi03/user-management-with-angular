import { Component, input, signal, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'error' | 'warning' | 'success';

@Component({
  selector: 'show-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-error.html',
  styleUrl: './show-error.css',
})
export class ShowError {
  type = input<AlertType>('error');
  message = input<string>('');
  timeout = input<number>(4000);
  size = input<string>('p-1');

  showMessage = signal(false);
  classes = signal<string[]>([]);
  iconClass = signal('');

  private timerId?: number;

  constructor() {
    effect(() => {
      const msg = this.message();
      if (!msg) return;

      untracked(() => this.show());
    });
  }

  private show() {
    this.clearTimer();

    this.showMessage.set(true);

    const { alertClass, icon } = this.getTypeConfig();

    this.classes.set([
      'alert',
      'alert-dismissible',
      'fade',
      'show',
      this.size(),
      alertClass,
    ]);

    this.iconClass.set(icon);

    this.timerId = window.setTimeout(() => this.hide(), this.timeout());
  }

  private hide() {
    this.showMessage.set(false);
    this.classes.update(c => [...c, 'hide']);
  }

  private clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
  }

  private getTypeConfig(): { alertClass: string; icon: string } {
    switch (this.type()) {
      case 'warning':
        return {
          alertClass: 'alert-warning',
          icon: 'bi bi-exclamation-circle',
        };

      case 'success':
        return {
          alertClass: 'alert-success',
          icon: 'bi bi-check-circle-fill',
        };

      default:
        return {
          alertClass: 'alert-danger',
          icon: 'bi bi-x-circle-fill',
        };
    }
  }
}
