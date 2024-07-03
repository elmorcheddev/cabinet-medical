import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/monService/auth.service';
 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string;

  constructor(private authService: AuthService) { }

  onSubmit(form:NgForm) {
     this.authService.forgotPassword(form.value.email).subscribe(
      response => {
        console.log(response)
        alert('Password reset link sent to your email.');
      },
      error => {
        alert('Error sending password reset link.');
      }
    );
  }
}
