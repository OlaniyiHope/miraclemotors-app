import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Helpers } from 'src/app/app.helpers';
import { Pages } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private helpers: Helpers) {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.minLength(11)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      gender: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {

  }



  async submitForm() {
    await this.helpers.createLoader('Signing up. Please wait...');
    const signupData = this.signupForm.value;
    this.auth.signup(signupData).subscribe(
      async res => {
        await this.auth.authSuccess(
          res.data.accessToken,
          res.data.refreshToken,
          res.data.user
        );
        await this.helpers.setRoot(Pages.home);
        this.helpers.dismissLoader();
      },
      error => {
        this.helpers.dismissLoader();
        console.error(error);
      }
    );

  }

}
