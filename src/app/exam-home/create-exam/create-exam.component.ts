import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WebserviceService } from '../../services/webservice.service';
import { DatatransferService } from '../../services/datatransfer.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {

  private getTechnologyapi = this.getdata.itequestconstant + 'getTechnologies';
  private getCategoriesapi = this.getdata.itequestconstant + 'getCategories';
  private addexamapi = this.getdata.itequestconstant + 'addExam';
  private saveimageapi = this.getdata.itequestconstant + 'saveExamImage';


  createxamform: any;

  constructor(private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService) {
    this.createxamform = this.Formbuilder.group({
      "exam": [null, Validators.compose([Validators.required])],
      "level": [null, Validators.compose([Validators.required])],
      "Categoryid": [null, Validators.compose([Validators.required])],
      "subcatid": [null, Validators.compose([Validators.required])],
      "Duration": [null, Validators.compose([Validators.required])],
      "Total": [null, Validators.compose([Validators.required])],
      "files": [null, Validators.compose([Validators.required])],
      'upload': [false]
    })
  }
  public isViewable: boolean;

  ngOnInit() {
    this.url = '/assets/images/image-copy.png';
    this.isViewable = true;
    this.getCategories();

  }
  bulkupload() {
    this.isViewable = !this.isViewable;
    $("#exam").modal('hide');
  }


  allCategories: any;
  subcatid: any;
  examid:any;
  getCategories() {
    return this.makeapi.method(this.getCategoriesapi, "", "post")
      .subscribe(data => {
        this.allCategories = data;
        
        if (data.length > 0) {
          this.gettechnology(data[0]._id);
        }
      },
        Error => {
        });
  }
  allTechnologies: any;
  gettechnology(value) {
    return this.makeapi.method(this.getTechnologyapi + "?categoryid=" + value, "", "post")
      .subscribe(data => {
        this.categoryid = data[0]._id;
      
        if (data.length > 0) {
          this.allTechnologies = data[0].sub;
        } else {
          this.allTechnologies = [];
        }
      },
        Error => {
        });
  }
  categoryid: any;
  addmanualexam() {
    console.log(this.createxamform.value)
    if (this.createxamform.invalid) {
      this.markFormGroupTouched(this.createxamform);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
    }
    else {
      let reqdata ="categoryid=" + this.categoryid + "&subcatid=" + this.createxamform.value.subcatid  + "&examname=" + this.createxamform.value.exam + "&difficulty=" + this.createxamform.value.level
        + "&duration=" + this.createxamform.value.Duration + "&size=" + this.createxamform.value.Total
      return this.makeapi.method(this.addexamapi, reqdata, "post")
        .subscribe(data => {

          // if (data.status == 'success' && data.isexists != true) {
          //   this.router.navigateByUrl('/upload-exam');
          //   this.getdata.geteditexam(data.subcategoryid, this.createxamform.value.size, 1)

          this.getdata.addexam(data.examid, this.categoryid, this.createxamform.value.subcatid , this.createxamform.value.Total, 1)
          this.examid = data.examid;
          this.gettechnology(this.createxamform.value.Categoryid);
          this. saveImage();
          // this.router.navigateByUrl('/dashboard/exam-home/manual-entry');

          // }
          // else if (data.isexists == true) {
          //   this.getdata.showNotification('bottom', 'right', 'Title of the exam already exists !!', "danger");
          // }
        },
          Error => {
          });
    }
  }
  review() {
    this.router.navigateByUrl('/dashboard/exam-home/manual-entry');
  }
  uploads() {
    $("#bulkupload").modal('show')
  }


  saveImage() {
    let finalformdata: FormData = new FormData();
    finalformdata.append("file", (this.thumblineImage2File));
    finalformdata.append("examid", (this.examid));
    this.makeapi.method(this.saveimageapi, finalformdata, 'file')
      .subscribe(
        data => {
          if (data.status == 'success') {
            this.getCategories();
            this.createxamform.reset();
            this.getdata.showNotification('bottom', 'right', 'Category Created successfully !!', "success");
          }
          else {
          }
        },
        Error => {
        });
  }

  url: any;
  Filename: any;
  addexamimage(event) {
    let files = event.target.files;
    if (files) {
      this.Filename = files[0].name;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.url=e.target.result;
        }
        reader.readAsDataURL(files[0]);
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.thumblineImage2 = file.name;
      this.thumblineImage2File = file;
    }
  }



  
  thumblineImage2: any;
  thumblineImage2File: any;
  UploadthumblineImage2(event) {
    if (event.target.files[0].size > 3145728) {
      this.getdata.showNotification('bottom', 'right', 'File size must be less than 645 KB !!', "danger");
      return false;
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.thumblineImage2 = file.name;
      this.thumblineImage2File = file;
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
}
