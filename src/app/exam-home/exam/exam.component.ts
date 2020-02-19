import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, startWith, filter } from 'rxjs/operators';
import { WebserviceService } from '../../services/webservice.service';
import { DatatransferService } from '../../services/datatransfer.service';

declare var $;

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  private getCategoriesapi = this.getdata.itequestconstant + 'getCategories';
  private getTechnologyapi = this.getdata.itequestconstant + 'getTechnologies';
  private gethomecategoriesapi = this.getdata.itequestconstant + 'getAllExaminations';
  private changeExamStatusapi = this.getdata.itequestconstant + 'changeExamStatus';
  private filterSubCategory = this.getdata.itequestconstant + 'filterExamination';


  nodata = 'true';
  examlist: any[]
  filter = '';
  orderBy: any;
  p1 = 1;
  p2 = 1;
  p3 = 1;
  p4 = 1;
  allCategorys= [];
  allTechnology= []
  getAllCategorys= []
  order: string = 'value1';

  constructor(private router: Router, private makeapi: WebserviceService, private getdata: DatatransferService) {

  }

  ngOnInit() {
    this.getCategories();
    this.gethomeCategories("all");
  }
  createbtn() {
    this.router.navigateByUrl('/dashboard/exam-home/createexam');
  }
  edit() {
    this.router.navigateByUrl('/dashboard/exam-home/manual-entry');
  }
  disabled = false;

  toggleState(): void {
    this.disabled = !this.disabled;
  }
  getCategories() {
    let reqdata = "status=" + "All";
    return this.makeapi.method(this.getCategoriesapi, reqdata, "post")
      .subscribe(data => {
        this.allCategorys = data;
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            this.gettechnology(data[i]._id, i);
          }
        }

      },
        Error => {
        });
  }
  gettechnology(value, index) {
    return this.makeapi.method(this.getTechnologyapi + "?categoryid=" + value, "", "post")
      .subscribe(data => {
        if (data[0]['sub']) {
          for (var j = 0; j < data[0]['sub'].length; j++) {
            this.allTechnology.push(data[0]['sub'][j]);
          }
          console.log(this.allTechnology)
        } 
      },
        Error => {
        });
  }

  tabName = 'all'
  PublishSubCategories: any;
  UnpublishSubCategories: any;
  DraftSubCategories: any;
  gethomeCategories(tabname) {
    let reqdata = "status=" + tabname
    return this.makeapi.method(this.gethomecategoriesapi, reqdata, "post")
      .subscribe(data => {
        if (tabname == 'all')
          this.getAllCategorys = data;

        else if (tabname == 'published')
          this.PublishSubCategories = data;

        else if (tabname == 'unpublished') {
          this.UnpublishSubCategories = data;
        }
        else
          this.DraftSubCategories = data;

      },
        Error => {
        });
  }
  changeExamstatusExamid: any;
  changeExamChangeStatus: any;
  reqstatus: any;
  checkboxid: any
  checkboxchecked: any
  changeExamStatus(examid, status, event) {
    this.checkboxid = event.target.id;
    this.checkboxchecked = event.target.checked;
    this.changeExamstatusExamid = examid;
    if (status == "publish")
      this.reqstatus = 'published'
    else
      this.reqstatus = 'unpublished'

    this.changeExamChangeStatus = status;
    $('#changeExamStatus').modal("show");
  }
  confirmchangeExamStatus() {
    let reqdata = "examid=" + this.changeExamstatusExamid + "&status=" + this.reqstatus
    return this.makeapi.method(this.changeExamStatusapi, reqdata, "post")
      .subscribe(data => {
        if (data.status == 'success') {
          this.getdata.showNotification('bottom', 'right', 'Exam ' + this.changeExamChangeStatus + ' successfully!!', "success");
          $('#changeExamStatus').modal("hide");
          this.gethomeCategories(this.tabName)
        }
        else {
        }
      },
        Error => {
        });
  }
  cancelchangeExamStatus() {
    if (this.checkboxchecked == true)
      $('#' + this.checkboxid).prop("checked", false);
    else
      $('#' + this.checkboxid).prop("checked", true);
    $('#changeExamStatus').modal("hide");
  }

  publishedSearch = '';
  unpublishedSearch = '';
  draftSearch = '';
  allDuration = [];
  SubCategories: any;
  changetab(tabName) {
    if (tabName == 'all') {
      this.tabName = tabName;
      this.gethomeCategories("all");
      this.filter = ''


      this.checkAllTechnology(false);
      this.checkAllCategoty(false);
      this.checkAllLevel(false);

    }

    else if (tabName == 'published') {
      this.tabName = tabName;
      this.gethomeCategories("published");
      this.filter = '';


      this.checkAllTechnology(false);
      this.checkAllCategoty(false);
      this.checkAllLevel(false);


    }

    else if (tabName == 'unpublished') {
      this.tabName = tabName;
      this.gethomeCategories("unpublished");
      this.filter = '';

      this.checkAllTechnology(false);
      this.checkAllCategoty(false);
      this.checkAllLevel(false);

    }
    else {
      this.tabName = tabName;
      this.gethomeCategories("Draft");
      this.filter = '';

      this.checkAllTechnology(false);
      this.checkAllCategoty(false);
      this.checkAllLevel(false);

    }
  }
  FilterByCategorylist = [];
  FilterByTechnology = [];
  FilterByLevellist = [];


  filterBy(event, filterBy) {
    if (event.target.checked == true) {
      if (filterBy == "techname") {
        let val = $(".checksingle1:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByTechnology = val;
      }
      else if (filterBy == "level") {
        let val = $(".checksingle2:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByLevellist = val;
      }
      else {
        let val = $(".checksingle3:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByCategorylist = val;
      }
    }



    else {
      if (filterBy == "techname") {
        let val = $(".checksingle1:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByTechnology = val;
      }
      else if (filterBy == "level") {
        let val = $(".checksingle2:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByLevellist = val;
      }
      else {
        let val = $(".checksingle3:checkbox:checked").map(function () {
          var getdata = this.value;
          return getdata;
        }).get();
        this.FilterByCategorylist = val;
      }
    }
    this.filterbySearch()
  }

  checkAllTechnology(ischecked) {
    if (ischecked == true) {
      $('.checksingle1:checkbox').prop('checked', true);
      var checkforFilter = $('.checksingle1:checked').map(function () {
        return $(this).val();
      }).get();
      this.FilterByTechnology = checkforFilter;
    }
    else {
      $('.checksingle1:checkbox').prop('checked', false);
      this.FilterByTechnology = [];
    }
  }

  checkAllLevel(ischecked) {
    if (ischecked == true) {
      $('.checksingle2:checkbox').prop('checked', true);
      var checkforFilter = $('.checksingle2:checked').map(function () {
        return $(this).val();
      }).get();
      this.FilterByLevellist = checkforFilter;
    }
    else {
      $('.checksingle2:checkbox').prop('checked', false);
      this.FilterByLevellist = [];
    }
  }


  checkAllCategoty(ischecked) {
    if (ischecked == true) {
      $('.checksingle3:checkbox').prop('checked', true);
      var checkforFilter = $('.checksingle3:checked').map(function () {
        return $(this).val();
      }).get();
      this.FilterByCategorylist = checkforFilter;
    }
    else {
      $('.checksingle3:checkbox').prop('checked', false);
      this.FilterByCategorylist = [];
    }
  }


  filterbySearch() {
    let reqdata = "filterby=" + JSON.stringify({ "searchstr": this.filter, "techid": this.FilterByTechnology, "level": this.FilterByLevellist, "category": this.FilterByCategorylist, "status": this.tabName })
    return this.makeapi.method(this.filterSubCategory, reqdata, "post")
      .subscribe(data => {
        if (this.tabName == 'all')
          this.getAllCategorys = data;

        else if (this.tabName == 'published')
          this.PublishSubCategories = data;

        else if (this.tabName == 'unpublished') {
          this.UnpublishSubCategories = data;
        }
        else
          this.DraftSubCategories = data;
      },
        Error => {
        });
  }
  editexam(index, type) {
    var examData;
    if (type == 'all')
      examData = this.getAllCategorys[index];
    else if (type == 'published')
      examData = this.PublishSubCategories[index]
    else if (type == 'unpublished')
      examData = this.UnpublishSubCategories[index]
    else if (type == 'Draft')
      examData = this.DraftSubCategories[index]

    this.getdata.addexam(examData._id, examData.categoryid, examData.subcatid, examData.size, 1)
  }
}



