import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
    selector: 'bms-header',
    imports: [CommonModule, RouterModule, MaterialModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
   // Reference to the sidenav component
  //  @ViewChild('sidenav')
  // sidenav: MatSidenav = new MatSidenav;
   
  constructor(public authService: AuthenticationService){}

  onLogout():void{
    this.authService.logout();
    //this.sidenav.close(); // Optionally close the sidenav on logout

  }
}
