import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'bms-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // MatSlideToggleModule, 
    // MatInputModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatRadioModule,
    // MatCardModule,
    // ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'dss-portal';

}
