import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionLogService } from './action-log.service';

/**
 * Shared "live state" panel - a DevTools replacement right on the page.
 * Usage: <app-state-inspector /> - no inputs needed,
 * it reads the same global ActionLogService the meta-reducer writes to.
 */
@Component({
  selector: 'app-state-inspector',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './state-inspector.component.html',
  styleUrl: './state-inspector.component.scss',
})
export class StateInspectorComponent {
  protected readonly actionLog = inject(ActionLogService);
  protected readonly log = this.actionLog.log;

  protected formattedState(): string {
    const latest = this.log()[0];
    if (!latest) return '';
    return JSON.stringify(latest.stateAfter, null, 2);
  }
}
