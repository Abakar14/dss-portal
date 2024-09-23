import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';


@Component({
  selector: 'bms-root',
  standalone: true,
  imports: [
    RouterOutlet,  MaterialModule
    // MatSlideToggleModule, 
    // MatInputModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatRadioModule,
    // MatCardModule,
    // ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dss-portal';

}
