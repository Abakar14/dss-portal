import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './pages/header/header.component';


@Component({
  selector: 'bms-root',
  standalone: true,
  imports: [
    RouterOutlet, MaterialModule, HeaderComponent
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dss-portal';

}
