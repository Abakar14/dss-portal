import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './services/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { ManageRolesComponent } from './pages/admin/manage-roles/manage-roles.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { RoleDetailsComponent } from './pages/admin/role-details/role-details.component';
import { ManageRolesPermissionsComponent } from './pages/admin/manage-roles-permissions/manage-roles-permissions.component';
import { ManageUsersRolesComponent } from './pages/admin/manage-users-roles/manage-users-roles.component';

export const routes: Routes = [
  //public Routes
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }, 
  {
    path: '', canActivate:[authGuard],
    children: [
      {path: '', component: HomeComponent},
      { path: 'students', loadChildren: () => import("../app/pages/students/students.module").then(m => m.StudentsModule) },
      { path: 'teachers', loadChildren: () => import("../app/pages/teachers/teachers.module").then(m => m.TeachersModule) },
      { path: 'documents', loadChildren: () => import("../app/pages/documents/documents.module").then(m => m.DocumentsModule) },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'users', component: ManageUsersRolesComponent, 
        canActivate: [authGuard],
        data: {roles: ['MANAGE_USERS']},
       
       },
       
      { path: 'roles', component: ManageRolesPermissionsComponent,
        canActivate: [authGuard],
        data: {roles: ['MANAGE_USERS']}
       },
       { path: 'roles/:id', component: RoleDetailsComponent },
 
     ],
  },
{path: 'access-denied', component: AccessDeniedComponent},
{ path: '**', component: NotFoundComponent }, //Wildcard route for a 404 page
];
