import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StateInspectorComponent } from '../shared/state-inspector/state-inspector.component';

interface PatternLink {
  path: string;
  label: string;
  status: 'ready' | 'planned';
}

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, StateInspectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  protected readonly patterns: PatternLink[] = [
    { path: '/patterns/entity-adapter', label: '01 - Entity Adapter List', status: 'ready' },
    { path: '/patterns/optimistic-approval', label: '02 - Approve & Rollback', status: 'ready' },
    { path: '/patterns/retry-backoff', label: '03 - Retry & Backoff', status: 'ready' },
    { path: '/patterns/live-update-deferred-apply', label: '04 - Live Update with Deferred Apply', status: 'planned' },
    { path: '/patterns/store-vs-signal-store', label: '05 - NgRx Store vs Signal Store', status: 'planned' },
  ];
}
