import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { MaterialModule } from '../../../material/material.module';
import { UserProfile } from '../../../model/user';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'bms-manage-users',
  standalone: true,
  imports: [MaterialModule,  RouterModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {


  displayedColumns: string[] = ['name', 'username', 'email', 'gender', 'status', 'actions'];
  
  users: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>([]);

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.data = users;
    });
  }

  openAddUserDialog(): void {
     const dialogRef = this.dialog.open(AddEditUserDialogComponent, { width: '400px', data: { mode: 'add' } });
     dialogRef.afterClosed().subscribe((result) => {
       if (result) this.loadUsers();
     });
  }

  openEditUserDialog(user: UserProfile): void {
     const dialogRef = this.dialog.open(AddEditUserDialogComponent, { width: '400px', data: { user, mode: 'edit' } });
     dialogRef.afterClosed().subscribe((result) => {
       if (result) this.loadUsers();
     });
  }
  

  confirmDeleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
    }
  }


}
