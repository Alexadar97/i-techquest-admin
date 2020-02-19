import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';
import { WebserviceService } from '../../services/webservice.service';
import { DatatransferService } from '../../services/datatransfer.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import 'rxjs/add/operator/filter';



declare var $;

@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent implements OnInit {


  private getExamPreviewapi = this.getdata.itequestconstant + 'getQuestionPreview';
  private addQuestionapi = this.getdata.itequestconstant + 'createQuestion';
  private changeExamStatusapi = this.getdata.itequestconstant + 'changeExamStatus';


  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;



  constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService) {

  }


  currentPageFooter = 1;
  examid: any;
  subcatid: any;
  categoryid: any;
  size: any;
  questionnumber = 1;
  multiple = 'true';
  question = '';
  nodata = 'true';
  multipleanswerPreview: any;
  singleanswerPreview: any;

  ngOnInit() {

    this.route.queryParams
      .filter(params => params.examid)
      .subscribe(params => {
        this.examid = params.examid;
      });
      this.route.queryParams
      .filter(params => params.categoryid)
      .subscribe(params => {
        this.categoryid = params.categoryid;
      });
      this.route.queryParams
      .filter(params => params.subcatid)
      .subscribe(params => {
        this.subcatid = params.subcatid;
      });

    this.route.queryParams
      .filter(params => params.size)
      .subscribe(params => {
        this.size = params.size;
      });

    this.route.queryParams
      .filter(params => params.currentpage)
      .subscribe(params => {
        this.currentPageFooter = Number(params.currentpage);
        this.questionnumber = Number(params.currentpage);
      });

    this.Multipleanswer();
    this.addRow();
    this.addRow();
    this.addRow();
    this.singleanswer();
    this.singleaddRow();

    this.previousAndGo('pageonload')
  }


  dataentry() {
    this.nodata = 'false';
    this.multipleanswerPreview = this.MultipleanswerForm.get('details').value;
    this.singleanswerPreview = this.singleanswerForm.get('singledetails').value;
    $('#previewhtml').html(this.question);

  }
  pushradio(index) {
    for (var i = 0; i < this.singleanswerForm.get('singledetails').value.length; i++) {
      var getform = this.singleanswerForm.get('singledetails').value;
      if (index == i) {
        getform[i].checked = true;
      }
      else {
        getform[i].checked = false;
      }
    }
    this.nodata = 'false';
    this.singleanswerForm.get('singledetails').patchValue(getform);
    this.singleanswerPreview = this.singleanswerForm.get('singledetails').value;
  }

  type = 'multiple';
  changeAnswerType(type) {
    if (type == 'multiple') {
      this.multiple = 'true';
      this.type = type;
    }
    else {
      this.multiple = 'false';
      this.type = type;
    }
  }

  get MultipleanswerDetail() { return <FormArray>this.MultipleanswerForm.get('details') }

  MultipleanswerForm: FormGroup;
  details: FormArray;
  Multipleanswer() {
    this.MultipleanswerForm = this.Formbuilder.group({
      details: this.Formbuilder.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.Formbuilder.group({
      answer: [null, Validators.compose([Validators.required])],
      checked: [null],
    });
  }
  addMultiplebtn = 'true';
  addRow(): void {
    if (this.MultipleanswerForm.get('details').value.length > 6) {
      this.addMultiplebtn = 'false';
    }
    else {
      this.addMultiplebtn = 'true';
    }
    this.details = <FormArray>this.MultipleanswerForm.get('details');
    this.details.push(this.createItem());
    // console.log(this.MultipleanswerForm.get('details').value)
  }

  /** Delete Row */d
  deleteRow(rowNumber) {
    if (this.MultipleanswerForm.get('details').value.length < 9) {
      this.addMultiplebtn = 'true';
    }
    this.details = <FormArray>this.MultipleanswerForm.get('details');
    this.details.removeAt(rowNumber);
    this.multipleanswerPreview = this.MultipleanswerForm.get('details').value;
  }

  singleanswerForm: FormGroup;
  singledetails: FormArray;

  get singleanswerDetail() { return <FormArray>this.singleanswerForm.get('singledetails') }


  singleanswer() {
    this.singleanswerForm = this.Formbuilder.group({
      singledetails: this.Formbuilder.array([this.createItemsingle()]),
    });
  }

  createItemsingle(): FormGroup {
    return this.Formbuilder.group({
      answer: [null, Validators.compose([Validators.required])],
      checked: [null],
    });
  }
  addSinglebtn: any;
  singleaddRow(): void {
    if (this.singleanswerForm.get('singledetails').value.length > 6) {
      this.addSinglebtn = 'false';
    }
    else {
      this.addSinglebtn = 'true';
    }
    this.singledetails = <FormArray>this.singleanswerForm.get('singledetails');
    this.singledetails.push(this.createItemsingle());
  }

  /** Delete Row */
  singledeleteRow(rowNumber) {
    if (this.singleanswerForm.get('singledetails').value.length < 9) {
      this.addSinglebtn = 'true';
    } this.singledetails = <FormArray>this.singleanswerForm.get('singledetails');
    this.singledetails.removeAt(rowNumber);
    this.singleanswerPreview = this.singleanswerForm.get('singledetails').value;
  }
  showmodal(){
    $('#delete').modal("show");
  }
  delete() {
    this.correctanswer = ',';
    this.questionerror = '';
    this.nocheckselect = '';
    this.nocheckselectradio = '';
    this.singleanswerForm.reset();
    this.MultipleanswerForm.reset();
    this.question = "";
    this.nodata = "true";
    $('#multiplecheckReset').prop('checked', true);
    this.changeAnswerType('multiple')
    for (var i = this.singleanswerForm.get('singledetails').value.length; i > 1; i--) {
      this.singledeleteRow(i)
    }
    for (var j = this.MultipleanswerForm.get('details').value.length; j > 3; j--) {
      this.deleteRow(j)
    }
    $('#delete').modal("hide");
  }
  id = "";
  currentquestion = false;
  previousAndGo(name) {
    let reqdata;
    if (name == "addnext") {
      reqdata = "seqid=" + (this.currentPageFooter + 1) + "&examid=" + this.examid;;
    }
    else if (name == "pageonload") {
      reqdata = "seqid=" + this.currentPageFooter + "&examid=" + this.examid;
    }
    else if (name == "go") {
      reqdata = "seqid=" + this.currentPageFooter + "&examid=" + this.examid;
    }
    else if (name == 'next') {
      reqdata = "seqid=" + (this.currentPageFooter + 1) + "&examid=" + this.examid;;
    }
    else {
      reqdata = "seqid=" + (this.currentPageFooter - 1) + "&examid=" + this.examid;
    }
    return this.makeapi.method(this.getExamPreviewapi, reqdata, "post")
 
      .subscribe(data => {
        if (data.status == "failure") {
          this.id = "";
          this.ifradiocorrectanswer = -1;
          if (this.currentquestion == true && (name == "next" || name == "addnext")) {
            this.questionnumber = (this.currentPageFooter + 1);
            this.currentPageFooter = this.questionnumber;
            this.delete();
            this.getdata.addexam(this.examid, this.categoryid, this.subcatid, this.size, this.questionnumber);
            this.currentquestion = false;
          }
          else if (this.currentquestion == true && name == "go") {
            this.getdata.showNotification('bottom', 'right', 'No questions found !!', "danger");
            this.currentPageFooter = this.questionnumber;
          }
          else if (this.currentquestion == false && name == "addnext") {
            this.questionnumber = (this.currentPageFooter + 1);
            this.currentPageFooter = this.questionnumber;
            this.delete();
            this.getdata.addexam(this.examid, this.categoryid, this.subcatid, this.size, this.questionnumber);
            this.currentquestion = false;
          }
          else if (this.currentquestion == false && (name == "next" || name == "go")) {
            this.getdata.showNotification('bottom', 'right', 'No questions found !!', "danger");
            this.currentPageFooter = this.questionnumber;
          }
        }
        else {
          this.ifradiocorrectanswer = -1;
          this.currentquestion = true;
          this.id = data._id;
          this.editdata = data;
          this.pusheditData()
          if (name == "pageonload") {
            this.questionnumber = this.currentPageFooter
          }
          else if (name == "go") {
            this.questionnumber = this.currentPageFooter
          }
          else if (name == 'next' || name == "addnext") {
            this.questionnumber = (this.currentPageFooter + 1);
            this.currentPageFooter = this.questionnumber
          }
          else {
            this.questionnumber = (this.currentPageFooter - 1);
            this.currentPageFooter = this.questionnumber;
          }
          this.getdata.addexam(this.examid, this.categoryid, this.subcatid, this.size, this.questionnumber);

        }

      },
        Error => {
          this.currentPageFooter = this.questionnumber;
        });
  }

  allowpublish() {
    var reqdata = "seqid=" + this.size + "&examid=" + this.examid;
    return this.makeapi.method(this.getExamPreviewapi, reqdata, "post")
      .subscribe(data => {
        if (data.status == "failure") {
          this.getdata.showNotification('bottom', 'right', 'Minimum ' + this.size + ' questions are required !!', "danger");
        }
        else {
          $('#changeExamStatus').modal("show");
        }
      },
        Error => {
          this.currentPageFooter = this.questionnumber;
        });

  }

  questionerror = '';
  correctanswer = ',';
  nocheckselect = '';
  nocheckselectradio = '';
  answertext = []
  radiocorrectanswer: any;
  save(typepuborsave) {
    this.answertext = []
    var getform;
    this.correctanswer = ',';
    this.questionerror = '';
    this.nocheckselect = '';
    this.nocheckselectradio = '';
    if (this.type == 'multiple') {
      getform = this.MultipleanswerForm.get('details').value;
      if (this.question.length < 10) {
        // this.questionerror = "Minimum 10 characters is required";
        this.getdata.showNotification('bottom', 'right', ' Minimum 10 characters are required in question !!', "danger");
        return false;
      }
      if (this.MultipleanswerForm.get('details').invalid) {
        this.markFormGroupTouched(this.MultipleanswerForm);
        this.getdata.showNotification('bottom', 'right', 'Answers are required !!', "danger");
        return false;
      }

      for (var i = 0; i < getform.length; i++) {
        if (getform[i].checked == true)
          this.correctanswer = this.correctanswer + (i + 1) + ',';
      }
      if (this.correctanswer == ",") {
        // this.nocheckselect = "Select atleast one option "
        this.getdata.showNotification('bottom', 'right', 'Select atleast one option  !!', "danger");
        return false;
      }
      else {
        this.correctanswer = this.correctanswer.slice(1, -1);

        for (var i = 0; i < getform.length; i++) {
          this.answertext[i] = { "answertext": getform[i].answer }
        }
        if (typepuborsave == "save") {
          $('#save').modal("show");
        }
        else {
          this.allowpublish();
        }
      }
    }
    else {
      getform = this.singleanswerForm.get('singledetails').value;
      if (this.question.length < 10) {
        // this.questionerror = "Minimum 10 characters is required";
        this.getdata.showNotification('bottom', 'right', ' Minimum 10 characters are required in question !!', "danger");
        return false;
      }
      if (this.singleanswerForm.get('singledetails').invalid) {
        this.markFormGroupTouched(this.singleanswerForm);
        this.getdata.showNotification('bottom', 'right', 'Answers are required !!', "danger");
        return false;
      }

      for (var i = 0; i < getform.length; i++) {
        if (getform[i].checked == true)
          this.radiocorrectanswer = i + 1;
      }
      if (this.radiocorrectanswer == "" || this.radiocorrectanswer == undefined) {
        // this.nocheckselectradio = "Select atleast one option "
        this.getdata.showNotification('bottom', 'right', 'Select atleast one option  !!', "danger");
        return false;
      }
      else {
        for (var i = 0; i < getform.length; i++) {
          this.answertext[i] = { "answertext": getform[i].answer }
        }

        if (typepuborsave == "save") {
          $('#save').modal("show");
        }
        else {
          this.allowpublish();
        }
      }
    }
  }

  Confirmsave() {
    if (this.type == 'multiple') {
      var reqdata =   "examid=" + this.examid + "&questionobj=" + JSON.stringify({
        "id": this.id,"question": ((this.question).toString()), "type": this.type, "correctanswers": this.correctanswer, "answers": this.answertext
      })
      return this.makeapi.method(this.addQuestionapi, reqdata, "post")
        .subscribe(data => {
          if (data.status == "success") {
            this.delete();
            $('#save').modal("hide");
            this.getdata.showNotification('bottom', 'right', ' Question saved successfully !!', "success");
            if (this.questionnumber != this.size)
              this.previousAndGo('addnext')
            else
              this.previousAndGo('go')
          }
          else {
          }
        },
          Error => {
            $('#save').modal("hide");
          });
    }
    else {
      var reqdata =   "examid=" + this.examid + "&questionobj=" + JSON.stringify({
        "id": this.id,"question": this.question, "type": this.type, "correctanswers": ((this.radiocorrectanswer).toString()), "answers": this.answertext})
      return this.makeapi.method(this.addQuestionapi, reqdata, "post")
        .subscribe(data => {
          if (data.status == "success") {
            this.delete();
            $('#save').modal("hide");
            this.getdata.showNotification('bottom', 'right', ' Question saved successfully !!', "success");
            if (this.questionnumber != this.size)
              this.previousAndGo('addnext')
            else
              this.previousAndGo('go')
          }
          else {
          }
        },
          Error => {
            $('#save').modal("hide");
          });
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  editdata: any;
  savedraft() {

  }
  editcorrectanswer: any;

  currentPageFooterfunction(event) {
    this.currentPageFooter = $('#footerinput').val();
    if (event.keycode == 13) {
      this.previousAndGo('go')
    }
    else {
      this.previousAndGo('go')
    }
  }



  pusheditData() {
    this.delete();
    this.question = this.editdata.question
    this.nodata = 'false'
    this.editcorrectanswer = this.editdata.correctanswers;
    if (this.editdata.type == "multiple") {
      this.changeAnswerType("multiple");
      $('#multiplecheckReset').prop('checked', true);
    }
    else {
      this.changeAnswerType("single");
      $('#singlecheckReset').prop('checked', true);
    }
    for (var i = 0; i < this.editdata.answers.length; i++) {
      if (this.editdata.type == "multiple") {
        if (i > 3) {
          this.addRow()
        }
      }
      else {
        if (i > 1) {
          this.singleaddRow();
        }
      }
      if (i == (this.editdata.answers.length - 1)) {
        this.editanswercall()
      }
    }
  }
  ifradiocorrectanswer = -1
  editanswercall() {
    if (this.type == "multiple") {
      this.radiocorrectanswer = ''
      var getform = this.MultipleanswerForm.get('details').value
      for (var j = 0; j < this.editdata.answers.length; j++) {
        getform[j].answer = this.editdata.answers[j].text;
        if (this.editcorrectanswer.includes(j + 1)) {
          getform[j].checked = true;
        }
        else
          getform[j].checked = false;
      }
      this.MultipleanswerForm.get('details').patchValue(getform);
      this.multipleanswerPreview = this.MultipleanswerForm.get('details').value;
    }
    else {
      this.ifradiocorrectanswer = Number(this.editdata.correctanswers) - 1;
      var getform = this.singleanswerForm.get('singledetails').value
      for (var j = 0; j < this.editdata.answers.length; j++) {
        getform[j].answer = this.editdata.answers[j].text;
        if ((j) == Number(this.editdata.correctanswers) - 1) {
          getform[j].checked = true;
        }
        else
          getform[j].checked = false;
      }
      this.singleanswerForm.get('singledetails').patchValue(getform);
      this.singleanswerPreview = this.singleanswerForm.get('singledetails').value;
      for (var k = 0; k < this.singleanswerForm.get('singledetails').value.length; k++) {
        if (this.singleanswerForm.get('singledetails').value[k].checked == true) {
        }
      }
    }

  }

  changeExamStatus() {
    $('#changeExamStatus').modal("show");
  }
  // changeExamStatus() {
  //   if (this.currentPageFooter < this.size) {
  //     this.getdata.showNotification('bottom', 'right', 'Minimum '+ this.size  + ' questions are required !!', "danger");

  //   }
  //   else {
  //     $('#changeExamStatus').modal("show");
  //   }
  // }


  confirmchangeExamStatus() {
    let reqdata ="examid=" + this.examid + "&status=" + "published"
    return this.makeapi.method(this.changeExamStatusapi, reqdata, "post")
      .subscribe(data => {
        if (data.status == 'success') {
          this.getdata.showNotification('bottom', 'right', 'Exam published successfully!!', "success");
          $('#changeExamStatus').modal("hide");
          this.router.navigateByUrl('/dashboard/exam-home/exam');
        }
        else {
        }
      },
        Error => {
        });
  }
  cancelchangeExamStatus() {
    $('#changeExamStatus').modal("hide");
  }
  back(){
    $('#back').modal("show");
  }
  confirmback(){
    this.router.navigateByUrl('/dashboard/exam-home/exam');
    $('#back').modal("hide");
  }
}
