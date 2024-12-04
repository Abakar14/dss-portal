import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'bms-access-denied',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {

}
