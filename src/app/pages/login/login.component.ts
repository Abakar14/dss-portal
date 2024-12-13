import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';


@Component({
  selector: 'bms-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  
  hidePassword = true;

   loginForm: FormGroup;
    errorMessage= '';


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,  private authService: AuthenticationService ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("onSubmit invalid");
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    this.authService.login(username, password).subscribe(
      (success) => {
        if (success) {
          // Retrieve the returnUrl from query parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          this.router.navigate([returnUrl]); // Redirect to the returnUrl
        } else {
          this.errorMessage = "Invalid credentials";
        }
      },
      () => {
        this.errorMessage = "Login failed";
      }
    );
  }
  
//   onSubmit() {
//   if(this.loginForm.invalid){
//     console.log("onSubmit invalid")
//     return;
//    }

//    const { username, password } = this.loginForm.value;

//       // Handle form submission
//      this.authService.login(username, password).subscribe(
//           (success) => {
//                 if(success){
//                  if(this.router.url !== '/'){
//                   this.router.navigate(['/']); 

//                  }
//                   //this.router.navigate(['/']);                 
//                 }else{
//                   this.errorMessage = "Invalid credentials";
//                 }
//           },
//           () => {
//             this.errorMessage = "Login failed";
//           }
//       )      
// }


togglePasswordVisibility(): void {
  this.hidePassword = !this.hidePassword;
}



}
