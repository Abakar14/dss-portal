import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './services/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ManageUsersRolesComponent } from './pages/admin/manage-users-roles/manage-users-roles.component';
import { ManageRolesPermissionsComponent } from './pages/admin/manage-roles-permissions/manage-roles-permissions.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { RoleDetailsComponent } from './pages/admin/role-details/role-details.component';

export const routes: Routes = [
  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Authenticated Routes
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'students',
        loadChildren: () =>
          import('../app/pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'teachers',
        loadChildren: () =>
          import('../app/pages/teachers/teachers.module').then((m) => m.TeachersModule),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('../app/pages/documents/documents.module').then((m) => m.DocumentsModule),
      },
      { path: 'admin-dashboard', component: AdminDashboardComponent },

      // Role-Based Protected Routes
      {
        path: 'users',
        component: ManageUsersRolesComponent,
        canActivate: [authGuard],
        data: { roles: ['MANAGE_USERS'] }, // Requires MANAGE_USERS role
      },
      {
        path: 'roles',
        component: ManageRolesPermissionsComponent,
        canActivate: [authGuard],
        data: { roles: ['MANAGE_USERS'] }, // Requires MANAGE_USERS role
      },
      {
        path: 'roles/:id',
        component: RoleDetailsComponent,
        canActivate: [authGuard],
        data: { roles: ['MANAGE_ROLES'] }, // Requires MANAGE_ROLES role
      },
    ],
  },

  // Access Denied Route
  { path: 'access-denied', component: AccessDeniedComponent },

  // Wildcard Route for 404
  { path: '**', component: NotFoundComponent },
];
