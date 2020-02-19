import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthGuard } from '../services/canactivate.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { WebserviceService } from '../services/webservice.service';
import { DatatransferService } from '../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  test: Date = new Date();
  errormsg: any;
  loginForm: FormGroup;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  username: any;
  logintype: any;
  userid: any;
  type:any
  varsession: any;
  signinForm: FormGroup;
  loginVssignup = true;

  private loginapi = this.getdata.itequestconstant + 'login';

  constructor(private Formbuilder: FormBuilder, private router:Router, private element: ElementRef, private getsession: AuthGuard, private makeapi: WebserviceService, private getdata: DatatransferService) {
 
    this.loginForm = Formbuilder.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });
  }

   

  ngOnInit() {
    this.session();
    if (this.session() != null) {
      this.router.navigateByUrl('/dashboard/exam-home/exam');
      return true;
    }
    else {
      return true;
    }
  }
//  errormsg:any;
//   enterkey(keycode) {
//     if (keycode == 13)
//       this.login();
//   }
//   login() {
//     var getdata = this.loginForm.value;
//     var username = getdata.email;
//     var password = getdata.password;
//     if (this.loginForm.invalid) {
//       this.markFormGroupTouched(this.loginForm);
//       return false;
//     }
//     else if (username == 'admin' && password == 'admin') {
//       delete getdata.password;
//       getdata.roleid = 1;
//       localStorage.setItem("assesment-tool", JSON.stringify(getdata));
//       this.router.navigateByUrl('/dashboard');
//     }

//     else {
//       this.errormsg = 'Invalid Username or Password';
//     }
//   }
session() {
  return JSON.parse(localStorage.getItem("AssesmentAdminSession"));
}
login() {
  if (this.loginForm.invalid) {
    this.markFormGroupTouched(this.loginForm);
    this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
  }
  else {
    let reqdata = "loginUser="+JSON.stringify(this.loginForm.value)
    return this.makeapi.method(this.loginapi, reqdata, "postlogin")
      .subscribe(response => {
        this.setCookie('cookies', response.headers.get('token'), 1)
        this.makeapi.getToken()
        var data = response.json();
        // this.router.navigateByUrl('/dashboard/exam-home/exam');

        if (data.status == 'success') {
          this.errormsg='';
          if (data.username == 'wesly') {
            localStorage.setItem("AssesmentAdminSession", JSON.stringify(data));
            this.router.navigateByUrl('/dashboard/exam-home/exam');
          }
          else if(data.type == 'author' ) {
            localStorage.setItem("AssesmentAdminSession", JSON.stringify(data));
            this.router.navigateByUrl('/dashboard/exam-home/exam');
          }
         else if(data.type == 'user' ){
            this.router.navigateByUrl('/login');
            this.getdata.showNotification('bottom', 'right', "Invalid Email" , "danger");
           }
        }
        else {
          this.errormsg = data.message;
          this.router.navigateByUrl('/login');
          this.getdata.showNotification('bottom', 'right', data.message , "danger");
        }
      },
        Error => {
        });
  }
}
// login() {
//   if (this.loginForm.invalid) {
//     this.markFormGroupTouched(this.loginForm);
//     this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
//   }
//   else {
//     let requestdata = "loginUser=" + JSON.stringify(this.loginForm.value)
//     return this.makeapi.method(this.loginapi, requestdata, "postlogin")
//       .subscribe(response => {
//         this.setCookie('cookies', response.headers.get('token'), 1)
//         this.makeapi.getToken()
//         var data = response.json();
//         if ((data.status).toLowerCase() == "success") {
//           this.errormsg = '';
//           localStorage.setItem("Assessment-tool", JSON.stringify(data));
//           this.onloadfunction();
//           this.getdata.showNotification('bottom', 'right', 'Logged-in  successfully', "success");
//           this.router.navigateByUrl('/dashboard/exam-home/exam');
//         }
//         else {
//           this.errormsg = data.message;
//           this.getdata.showNotification('bottom', 'right', data.message, "danger");
//         }
//       },
//         Error => {
//         });
  
//   }
// }
// userimage: any;
// x:any;
// onloadfunction() {

//   if (this.session() == null) {
//       this.varsession = 'null'
//       this.logintype = '';
//       this.userid = '';
//       this.username = '';
//       this.x ='';
//       // this.router.navigateByUrl('/landing');
//       // this.userimage = "assets/images/user.png"
//       return true;
//   }
//   else {
//       this.varsession = 'notnull'
//       this.logintype = this.getsession.session().type;
//       this.userid = this.getsession.session().userid;
//       this.username = this.getsession.session().username;
//       this.x= this.getsession.session().username.charAt(0);
//       console.log(this.x)

//       if (this.userid == undefined)
//       this.userimage = "assets/img/user.png"
//   else {
//       this.userimage = this.userimage._value;
//       setInterval(() => {
//           this.userimage = this.userimage._value;
//       }, 1000);
//   }
//   }
// this.router.navigateByUrl('/landing');
  // this.listTitles = ROUTES.filter(listTitle => listTitle);
  // const navbar: HTMLElement = this.element.nativeElement;
  // this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
// }
setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));
  var expires = "expires=" + d.toUTCString();
  window.document.cookie = cname + "=" + cvalue + "; " + expires;
}
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
 
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
