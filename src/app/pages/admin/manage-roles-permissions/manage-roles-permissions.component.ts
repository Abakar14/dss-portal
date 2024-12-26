import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RoleService } from '../../../services/role.service';
import { PermissionService } from '../../../services/permission.service';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'bms-manage-roles-permissions',
    imports: [MaterialModule, CommonModule, RouterModule],
    templateUrl: './manage-roles-permissions.component.html',
    styleUrl: './manage-roles-permissions.component.scss'
})
export class ManageRolesPermissionsComponent implements OnInit {

  roles: any[] = []; // List of roles
  permissions: any[] = []; // List of permissions
  displayedColumns: string[] = ['permissions']; // Columns to display
  modifiedPermissions: { roleId: number; permissionId: number; assigned: boolean }[] = [];

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.loadRolesAndPermissions();
  }

  loadRolesAndPermissions(): void {

    forkJoin([this.roleService.getDetailsRoles(), this.permissionService.getPermissions()]).subscribe(
      ([roles, permissions]) => {
        this.roles = roles;
        this.permissions = permissions;
        this.displayedColumns = ['permissions', ...roles.map(role => role.name)];
      },
      error => console.error('Error loading roles or permissions', error)
    );
  }

  isPermissionAssigned(permission: any, role: any): boolean {
    return role.permissions.some((p: any) => p.id === permission.id);
  }

  onPermissionToggle(permission: any, role: any, isChecked: boolean): void {
    const existingIndex = this.modifiedPermissions.findIndex(
      mp => mp.roleId === role.id && mp.permissionId === permission.id
    );

    if (existingIndex !== -1) {
      this.modifiedPermissions[existingIndex].assigned = isChecked;
    } else {
      this.modifiedPermissions.push({
        roleId: role.id,
        permissionId: permission.id,
        assigned: isChecked
      });
    }

    // Update UI to reflect immediate change
    if (isChecked) {
      role.permissions.push(permission);
    } else {
      role.permissions = role.permissions.filter((p: any) => p.id !== permission.id);
    }

  }

  saveChanges(): void {
    const saveRequests = this.modifiedPermissions.map(mp =>
      mp.assigned
        ? this.roleService.addPermissionToRole(mp.roleId, mp.permissionId)
        : this.roleService.removePermissionFromRole(mp.roleId, mp.permissionId)
    );

    forkJoin(saveRequests).subscribe(
      () => {
        console.log('All changes saved successfully');
        this.modifiedPermissions = [];
        this.loadRolesAndPermissions(); // Reload data to reflect updated permissions
      },
      error => console.error('Error saving changes', error)
    );
  }






}
