import { Component } from '@angular/core';
import { ShellLayoutComponent } from './shell/shell-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShellLayoutComponent],
  template: `<app-shell-layout />`,
})
export class AppComponent {}
