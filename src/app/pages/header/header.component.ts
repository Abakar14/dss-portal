import { AsyncPipe, CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'bms-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule,
    AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  constructor(public authService: AuthenticationService){}

  logout():void{
    this.authService.logout();

  }
}
