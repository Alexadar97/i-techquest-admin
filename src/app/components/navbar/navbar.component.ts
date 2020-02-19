import { Component, OnInit,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, startWith, filter } from 'rxjs/operators';
import { WebserviceService } from '../../services/webservice.service';
import { AuthGuard } from '../../services/canactivate.service'
import { DatatransferService } from '../../services/datatransfer.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  location: Location;
  username: any;
  logintype: any;
  private listTitles: any[];
  userid: any;
  x:any;
  private logoutapi = this.getdata.itequestconstant + 'logout';

  constructor(location: Location,private router:Router, private getdata: DatatransferService, private getsession: AuthGuard,private element: ElementRef) {
    this.location = location;

   }


  ngOnInit() {
    // this.logintype = this.getsession.session().type;
    this.userid = this.getsession.session().userid;
    this.username = this.getsession.session().username;
    this.x= this.getsession.session().username.charAt(0);
    
  }
  technology() {
    this.router.navigateByUrl('/technology');
  }
  categories() {
    this.router.navigateByUrl('/categories');
  }
  exam(){
    this.router.navigateByUrl('/Exam');
  }
  logout() {
    // console.log(this.logoutapi)
    // let reqdata = "userid=" + this.userid
    // return this.makeapi.method(this.logoutapi, reqdata, "post")
    //     .subscribe(data => {
    //         if (data.status == "success") {
                localStorage.removeItem('AssesmentAdminSession');
                this.router.navigateByUrl('/login');
                this.deleteCookie('cookies')
        //     }
        //     else {
        //     }
        // },
        //     Error => {
        //     });
}
deleteCookie(cname) {
  var d = new Date(); 
  d.setTime(d.getTime() - (1000*60*60*24)); 
  var expires = "expires=" + d.toUTCString(); 
  window.document.cookie = cname+"="+"; "+expires;

}
getTitle() {
  var titlee = this.location.prepareExternalUrl(this.location.path());
  if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
  }
  titlee = titlee.split('/').pop();

  for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
          return this.listTitles[item].title;
      }
  }
  return 'Dashboard';
}
}
