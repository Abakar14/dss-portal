import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

@Component({
    selector: 'bms-manage-users-roles',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [MaterialModule, CommonModule, RouterModule, MatChipsModule],
    templateUrl: './manage-users-roles.component.html',
    styleUrl: './manage-users-roles.component.scss'
})
export class ManageUsersRolesComponent {


  users: any[] = []; // List of users fetched from the backend
  availableRoles: any[] = []; // List of roles fetched from the backend
  displayedColumns: string[] = ['users']; // Columns for the table
  modifiedUsers: { userId: number; roleId: number }[] = []; // Tracks updated roles for users
  
  constructor(private userService: UserService, private roleService: RoleService) {}
  
  ngOnInit(): void {
    this.loadUsersAndRoles();
  }
  
  loadUsersAndRoles(): void {
    // Fetch users and roles
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  
    this.roleService.getRoles().subscribe(roles => {
      this.availableRoles = roles;
      this.displayedColumns = ['users', ...roles.map(role => role.name)];
    });
  }
  onRoleChange(userId: number, roleId: number, isChecked: boolean): void {
    if (isChecked) {
      // Track the role change
      const existingIndex = this.modifiedUsers.findIndex(entry => entry.userId === userId);
      if (existingIndex !== -1) {
        this.modifiedUsers[existingIndex].roleId = roleId;
      } else {
        this.modifiedUsers.push({ userId, roleId });
      }

      // Update the role immediately in the UI
      this.users = this.users.map(user =>
        user.id === userId ? { ...user, role: this.availableRoles.find(role => role.id === roleId) } : user
      );
    }
  }

  saveChanges(): void {
    const saveRequests = this.modifiedUsers.map(({ userId, roleId }) =>
      this.userService.addRoleToUser(userId, roleId)
    );

    // Execute all save requests
    forkJoin(saveRequests).subscribe({
      next: () => {
        console.log('All role changes saved successfully.');
        this.modifiedUsers = []; // Clear modified users
        this.loadUsersAndRoles(); // Reload users and roles to reflect updated roles
      },
      error: (err) => {
        console.error('Error saving role changes:', err);
      }
    });
  }



  // openAddUserDialog(): void {
  //    const dialogRef = this.dialog.open(AddEditUserDialogComponent, { width: '400px', data: { mode: 'add' } });
  //    dialogRef.afterClosed().subscribe((result) => {
  //      if (result) this.loadUsers();
  //    });
  // }

  // openEditUserDialog(user: UserProfile): void {
  //    const dialogRef = this.dialog.open(AddEditUserDialogComponent, { width: '400px', data: { user, mode: 'edit' } });
  //    dialogRef.afterClosed().subscribe((result) => {
  //      if (result) this.loadUsers();
  //    });
  // }

  // openAssignRolesDialog(user: any): void {
  //   this.selectedUser = user;
  //   //this.dialog.open(this.assignRolesDialog);
  // }
  



  // confirmDeleteUser(userId: number): void {
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
  //   }
  // }


}
