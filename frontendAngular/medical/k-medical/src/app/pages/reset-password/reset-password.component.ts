import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/monService/auth.service';
 
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  newPassword: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        alert('Password updated successfully.');
      },
      error => {
        alert('Error updating password.');
      }
    );
  }
}
