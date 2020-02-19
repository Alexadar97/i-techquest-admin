import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { DatatransferService } from '../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from '../services/canactivate.service'


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  errormsg: any;
  changepasswordForm: FormGroup;
  finalappcode: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  show='true';


  // private changepasswordapi = this.getdata.appconstant + 'changePassword';

  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService,private getsession: AuthGuard,) {
    this.changepasswordForm = Formbuilder.group({
      'password': [null, Validators.compose([Validators.required])],
      'cpassword': [null, Validators.compose([Validators.required])],
    });
  }

email:any;
  ngOnInit() {
    // this.email = this.getsession.session().email;
  }
  onFormSubmit() {
    // let getform = this.changepasswordForm.value;
    // if (getform.password != getform.cpassword) {
    //   this.errormsg = "Password and Confirm Password are Mismatching"
    //   return false
    // }
    // else if (this.changepasswordForm.invalid) {
    //   this.markFormGroupTouched(this.changepasswordForm);
    //   this.getdata.showNotification('bottom', 'right', ' Invalid Password or Confirm Password !!', "danger");
    //   return false;
    // }
    // else {
    //   let reqdata = "email=" + this.email +"&password=" + this.changepasswordForm.value.password;
    //   return this.makeapi.method(this.changepasswordapi, reqdata, "post")
    //     .subscribe(data => {
    //       if (data.status == "success") {
    //         this.show='false'
    //         this.errormsg='';
    //         this.getdata.showNotification('bottom', 'right', ' New password changed Successfully !!!', "success");
    //       }
    //       else{
    //       }
    //     },
    //       Error => {
    //       });
    // }
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
