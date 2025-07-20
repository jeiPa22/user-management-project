import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-count-user',
  templateUrl: './count-user.component.html',
  styleUrl: './count-user.component.scss',
})
export class CountUserComponent {
  @Input() count: number | null = 0;
}
