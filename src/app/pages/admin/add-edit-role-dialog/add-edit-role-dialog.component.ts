import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { RoleDto } from '../../../model/user';

@Component({
  selector: 'bms-add-edit-role-dialog',
  standalone: true,
  imports: [],
  templateUrl: './add-edit-role-dialog.component.html',
  styleUrl: './add-edit-role-dialog.component.scss'
})
export class AddEditRoleDialogComponent implements OnInit {

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

}
