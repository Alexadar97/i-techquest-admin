import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';

declare var $: any;
@Injectable()
export class DatatransferService {
  appcode: any;
  userid: any;
  logintype: any;
  user_email: any;


  // appconstant = "http://13.127.198.178:8080/iTechQuest/";
  
  // itequestconstant = "http://172.30.1.240:9999/iTechQuest/";
  
  itequestconstant = "http://139.59.75.83:9999/iTechQuest/";



  // getsession = JSON.parse(localStorage.getItem("sevinvoicesession"));
  constructor(private router: Router) {

  }
  public session: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  getsession(value) {
    this.session.next(value);
  }
  showNotification(from, align, msg, type) {

    $.notify({
      icon: 'notifications',
      message: msg

    }, {
        type: type,
        timer: 2000,
        placement: {
          from: from,
          align: align
        }
      });
  }
  categoryid: any;
  examid: any;
  size: any;
  subcatid: any
  currentpage: any;
  // getSingleExam(catid,subcatid) {
  //   this.categoryid = catid;
  //   this.subcatid = subcatid
  //   // this.router.navigateByUrl('/dashboard/'+value);
  //   this.router.navigate(['/dashboard/single-course'], { queryParams: { categoryid: this.categoryid,subcatid:this.subcatid } });
  // }

  geteditexam(examid, size, currentpage) {
    this.examid = examid;
    this.size = size;
    this.currentpage = currentpage
    this.router.navigate(['/dashboard/technology'], { queryParams: { examid: this.examid, size: this.size, currentpage: this.currentpage } });
  }
  addexam(examid,categoryid, subcatid, size, currentpage) {
    this.examid = examid;
    this.categoryid = categoryid;
    this.subcatid = subcatid;
    this.size = size;
    this.currentpage = currentpage
    this.router.navigate(['/dashboard/exam-home/manual-entry'], { queryParams: { examid: this.examid,categoryid:this.categoryid, subcatid:this.subcatid,  size: this.size, currentpage: this.currentpage } });
  }
}
