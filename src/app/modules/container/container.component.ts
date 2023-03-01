import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent { }
