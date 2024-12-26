import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'bms-sidebar',
    imports: [MaterialModule, RouterOutlet],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
