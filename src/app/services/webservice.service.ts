
import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatatransferService } from '../services/datatransfer.service';

@Injectable()
export class WebserviceService {

  token: any;

  constructor(private http: Http,private spinner: NgxSpinnerService, private getdata: DatatransferService) {
    this.token = this.getCookie('cookies');
  }

  method(url, data, method): Observable<any> {
    if (method === 'post') {
      this.spinner.show();
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', this.token);
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) =>  response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
          this.spinner.hide();
        });
    }
 
    if (method === 'postlogin') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(url, data, { headers: headers })
          .map((response: Response) => response);
  }
    if (method === 'postDuration') {
      this.spinner.show();
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => (response))
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
          this.spinner.hide();
          console.log("finally")
        });
    }
    if (method === 'get') {
      this.spinner.show();
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', this.token);
      return this.http.get(url)
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error));
          }
        })
        .finally(() => {
          this.spinner.hide();
        });
    }
    if (method === 'file') {
      this.spinner.show();
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', this.token);
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
          this.spinner.hide();
        });
    }
  }
  getCookie(cname) {
    var name = cname + "=";
    var cArr = window.document.cookie.split(';');
    for (var i = 0; i < cArr.length; i++) {
      var c = cArr[i].trim();
      if (c.indexOf(name) == 0)
        return c.substring(name.length, c.length);
    }
    return "";
  }
  getToken() {
    this.token = this.getCookie('cookies');
  }
}
