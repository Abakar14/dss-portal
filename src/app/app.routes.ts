import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }, 
  
  {
    path: '',
    component: LayoutComponent,
    canActivate:[authGuard],
    children: [
      { path: 'students', 
        loadChildren: () => import("../app/pages/students/students.module").then(m => m.StudentsModule)
      },
      { path: '', redirectTo: '/students', pathMatch: 'full' }, // Default route
      // { path: '**', redirectTo: '/students' }, // Wildcard route for 404
      { path: 'about', component: AboutComponent },
    ],
  },

  { path: '**', component: NotFoundComponent }, //Wildcard route for a 404 page
];
