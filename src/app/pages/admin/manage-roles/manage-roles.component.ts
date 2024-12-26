import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditRoleDialogComponent } from '../add-edit-role-dialog/add-edit-role-dialog.component';
import { RoleService } from '../../../services/role.service';
import { RouterModule } from '@angular/router';
import { RoleDto } from '../../../model/user';
import { RoleDetailsComponent } from '../role-details/role-details.component';

@Component({
    selector: 'bms-manage-roles',
    imports: [MaterialModule, RouterModule],
    templateUrl: './manage-roles.component.html',
    styleUrl: './manage-roles.component.scss'
})
export class ManageRolesComponent {

  displayedColumns: string[] = ['roleName', 'permissions', 'actions'];

  roles: MatTableDataSource<RoleDto> = new MatTableDataSource<RoleDto>([]);

  constructor(private roleService: RoleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles.data = roles;
    });
  }

  openAddRoleDialog(): void {
    const dialogRef = this.dialog.open(AddEditRoleDialogComponent, { width: '400px', data: { mode: 'add' } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadRoles();
    });
  }

  openEditRoleDialog(role: RoleDto): void {
    const dialogRef = this.dialog.open(AddEditRoleDialogComponent, { width: '400px', data: { role, mode: 'edit' } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadRoles();
    });
  }

  openRoleDetailsDialog(roleId: number): void {
    
    const dialogRef = this.dialog.open(RoleDetailsComponent, {
      width: '600px',
      data: { roleId }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }
}
