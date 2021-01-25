import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mitre Attack Group Finder';

  public light = false;

  public switchTheme() {
    this.light = !this.light;
  }
}
