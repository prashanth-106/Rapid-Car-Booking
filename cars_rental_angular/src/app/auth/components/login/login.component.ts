import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isSpinning:boolean=false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
       if (StorageService.isAdminLoggedIn()) {
              this.message.success("welcome Admin!", { nzDuration: 5000 });

        this.router.navigateByUrl("/admin/dashboard");
      } else if (StorageService.isCustomerLoggedIn()) {
        this.message.success("welcome Customer!", { nzDuration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
      } else {
        this.message.error("Bad credentials.", { nzDuration: 50000 });
      }
    }
    })

  }

}
