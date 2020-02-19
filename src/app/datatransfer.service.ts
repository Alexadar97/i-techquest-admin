import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
declare var $: any;
@Injectable()
export class DatatransferService {
  appcode: any;
  userid: any;
  logintype: any;
  user_email: any;


  //qa Server
 
  appconstant = "http://13.127.238.116:8080/iTechQuest/";

  //  live server
  // appconstant = 'https://www.digitalsupplychain.bharatbenz.com/DaimPR/pr/';

  constructor() {}




  getsession() {
    // return JSON.parse(localStorage.getItem("Daim-PRsesssion"));
}

showhomePageMenu = 'show'

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

 
}
