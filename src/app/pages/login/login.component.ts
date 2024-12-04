import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
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


  constructor(private fb: FormBuilder, private router: Router,  private authService: AuthenticationService ) {
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
  if(this.loginForm.invalid){
    console.log("onSubmit invalid")
    return;
   }

   const { username, password } = this.loginForm.value;

      // Handle form submission
      //console.log('Login form submitted', this.loginForm.value);
      this.authService.login(username, password).subscribe(
          (success) => {
                if(success){
                 if(this.router.url !== '/'){
                  this.router.navigate(['/']); 

                 }
                  //this.router.navigate(['/']);                 
                }else{
                  this.errorMessage = "Invalid credentials";
                }
          },
          () => {
            this.errorMessage = "Login failed";
          }
      )      
   
  

}


togglePasswordVisibility(): void {
  this.hidePassword = !this.hidePassword;
}



}
