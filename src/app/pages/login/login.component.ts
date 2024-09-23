import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'bms-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  
  //[x: string]: any;

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
   /*  debugger; */
   console.log("onSubmit")
   if(this.loginForm.invalid){
    console.log("onSubmit invalid")
    return;
   }

   const { username, password } = this.loginForm.value;

      // Handle form submission
      console.log('Login form submitted', this.loginForm.value);
      this.authService.login(username, password).subscribe(
          (success) => {
                if(success){
                  console.log("onSubmit success");
                  this.router.navigate(['/']);
                  // location.href = "";
                }else{
                  this.errorMessage = "Invalid credentials";
                }
          },
          () => {
            this.errorMessage = "Login failed";
          }
      )      
   
  

}



}
