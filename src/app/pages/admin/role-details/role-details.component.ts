import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Role} from '../../../model/user';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'bms-role-details',
    imports: [CommonModule, MaterialModule, RouterModule, MatIconModule,
        MatListModule,],
    templateUrl: './role-details.component.html',
    styleUrl: './role-details.component.scss'
})
export class RoleDetailsComponent implements OnInit {

  role: Role = {
    
      id: 0,
      name: "",
      description: "",
      parentRoleId: 0,
      addedBy: "",
      isActive: false,
      deleted: false,
      addedOn: "",
      modifiedBy: "",
      modifiedOn: "",
      childRoles: [],
      permissions:[]
 
  };

  constructor(private route: ActivatedRoute, private roleService: RoleService) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    const roleId = +this.route.snapshot.paramMap.get('id')!;
    if (roleId) {
      console.log("ngOnInit : "+this.role);
      this.loadRoleDetails(roleId);
    }
  }

  loadRoleDetails(roleId: number): void {
    console.log("loadRoleDetails : "+roleId);
    this.roleService.getRoleById(roleId).subscribe({
      next: (role) => {
        this.role = role;
      },
      error: (err) => {
        console.error('Error fetching role details', err);
      }
    });
  }

}
