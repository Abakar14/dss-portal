import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './pages/shared/sidebar/sidebar.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/shared/header/header.component';


@Component({
  selector: 'bms-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet, MaterialModule, HeaderComponent,FooterComponent, SidebarComponent
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dss-portal';
  constructor(public authService: AuthenticationService){}

}
