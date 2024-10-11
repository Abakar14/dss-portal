import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../model/student';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../../services/logging.service';
import { error } from 'console';

@Component({
  selector: 'bms-admin-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent  implements OnInit{
  totalUsers: number = 0;
  totalRoles: number = 0;
  totalLogs: number = 0;
  users: UserProfile[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  logs: any[] = [];
  logColumns: string[] = ['timestamp', 'event', 'user', 'description'];  // Log table columns

  constructor(private userService: UserService, private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadSummaryData();
    this.loadUsers();
     this.loadLogs();
    // this.loadClusterHealth();
  }

  loadClusterHealth(){

    this.loggingService.getClusterHealth().subscribe(
      response => {
        console.log('Elasticsearch Cluster Health:', response);
      },
      error => {
        console.error('Error fetching cluster health:', error);
      }
    );

    // Example search query
    const searchQuery = {
      query: {
        match_all: {}
      }
    };

    this.loggingService.searchIndex('my-index', searchQuery).subscribe(
      response => {
        console.log('Search results:', response);
      },
      error => {
        console.error('Search error:', error);
      }
    );

  }


  // Load total counts for users, roles, and logs
  loadSummaryData() {
    this.userService.getTotalUsers().subscribe(total => {
      this.totalUsers = total;
    });

    this.userService.getTotalRoles().subscribe(total => {
      this.totalRoles = total;
    });

    // this.userService.getTotalLogs().subscribe(total => {
    //   this.totalLogs = total;
    // });
  }

  // Load users for the user management table
  loadUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.content;
    });
  }

  // Action to edit a user (can navigate to user edit form)
  editUser(user: any) {
    console.log('Edit user:', user);
    // Navigate to edit page or open a dialog
  }

  // Action to delete a user
  deleteUser(user: any) {
    console.log('Delete user:', user);
    // Call delete API and refresh the table
  }


  loadLogs():void {
    this.loggingService.getLogs().subscribe(response =>{
      this.logs = response.hits.hits;
      this.totalLogs = this.logs.length;

    }, error => {
      console.error('Error fetching logs:', error);
    })

  }
}
