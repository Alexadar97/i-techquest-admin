import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WebserviceService } from '../services/webservice.service';
import { DatatransferService } from '../services/datatransfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

declare var $;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  private addcategorieapi = this.getdata.itequestconstant + 'addCategory';
  private getCategoriesapi = this.getdata.itequestconstant + 'getCategories';
  private deleteCategoriesapi = this.getdata.itequestconstant + 'deleteCategory';
  private editCategoriesapi = this.getdata.itequestconstant + 'updateCategory';
  private saveimageapi = this.getdata.itequestconstant + 'saveCategoryImage';
  private getimagapi = this.getdata.itequestconstant + 'getCategoryImage';

  constructor(private Formbuilder: FormBuilder, private router: Router, private makeapi: WebserviceService, private getdata: DatatransferService, private orderPipe: OrderPipe) {

    this.categorieforrm = this.Formbuilder.group({
      "name": [null, Validators.compose([Validators.required])],
      "file": [null, Validators.compose([Validators.required])],
    })
    this.EditcreateCategory = Formbuilder.group({
      "name": [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.getCategories();
  }
  categorieforrm: FormGroup;
  EditcreateCategory: FormGroup;
  filter: any;
  page = 1;
  allCategorys = [];

  getCategories() {
    return this.makeapi.method(this.getCategoriesapi, "", "post")
      .subscribe(data => {
        this.allCategorys = data;
      },
        Error => {
        });
  }

  // delete_id: any;
  // deletecategory(id) {
  //   this.delete_id = id;
  //   $("#delete").modal("show");
  // }
  // Confirmdeletecategory() {
  //   let reqdata = "categoryid=" + this.delete_id;
  //   return this.makeapi.method(this.deleteCategoriesapi, reqdata, "post")
  //     .subscribe(data => {
  //       if (data.status == "success") {
  //         $("#delete").modal("hide");
  //         this.getdata.showNotification('bottom', 'right', ' Category Deleted Successfully !!!', "success");
  //         this.getCategories();
  //       }
  //       else {
  //         this.getdata.showNotification('bottom', 'right', ' Category Not Deleted !!!', "danger");
  //         $("#delete").modal("hide");
  //       }
  //     },
  //       Error => {
  //       });
  // }
  
  assets1 = 'assets/images/bg.jpg';

  categorySingleDetail: any;
  editcategory(index) {
    this.categorySingleDetail = this.allCategorys[index];
    this.assets1 = this.getimagapi + '?filename=' + this.categorySingleDetail._id + "&timestamp=" + new Date().getTime();
    var getdata = this.EditcreateCategory.value;
    console.log(getdata)
    getdata.name = this.allCategorys[index].name
    this.EditcreateCategory.patchValue(getdata)
    $("#edit").modal("show");
  }
  Confirmeditcategory() {
    if (this.EditcreateCategory.invalid) {
      this.markFormGroupTouched(this.EditcreateCategory);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
    }
    else {
      let reqdata = "categoryid=" + this.categorySingleDetail._id + "&categoryname=" + this.EditcreateCategory.value.name
      return this.makeapi.method(this.editCategoriesapi, reqdata, "post")
        .subscribe(data => {
          
          // if (data.status == 'success' && data.isExist != 'true') {
          //   $("#edit").modal("hide");
          this.getCategories();
          $("#edit").modal("hide");
          this.getdata.showNotification('bottom', 'right', ' Category Edited Successfully !!!', "success");
          // }
          // else if (data.isExist == 'true') {
          //   this.getdata.showNotification('bottom', 'right', ' Category name already exists !!!', "danger");
          // }
          // else {
          // }
        },
          Error => {
          });
    }
  }
  addcategory() {
    if (this.categorieforrm.invalid) {
      this.markFormGroupTouched(this.categorieforrm);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
    }
    else {
      let reqdata = "categoryname=" + this.categorieforrm.value.name
      return this.makeapi.method(this.addcategorieapi, reqdata, "post")
        .subscribe(data => {
          if (data.status == 'success' && data.isexists != true) {
            this.saveImage(data.categoryid);
            this.getCategories();
            this.thumblineImage2 = '';
            this.categorieforrm.reset();
            this.getdata.showNotification('bottom', 'right', 'Category Added Successfully !!', "success");


          }
          else if (data.isexists == true) {
            this.getdata.showNotification('bottom', 'right', 'Title of the exam already exists !!', "danger");
          }
        },
          Error => {
          });
    }
  }

  thumblineImage2: any;
  thumblineImage2File: any;
  UploadthumblineImage2(event) {
    if (event.target.files[0].size > 2048000 - 614400) {
      this.getdata.showNotification('bottom', 'right', 'File size must be 200 KB to 600 KB !!', "danger");
      return false;
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.thumblineImage2 = file.name;
      this.thumblineImage2File = file;
    }
  }

  singleCategoryImage: any
  singleCategoryImageFile: any;
  categroiesid: any;

  changeCategoryImage(event) {
    if (event.target.files[0].size > 3145728) {
      this.getdata.showNotification('bottom', 'right', 'File size must be less than 3 MB !!', "danger");
      return false;
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.singleCategoryImage = file.name;
      this.thumblineImage2File = file;
    }
    this.saveImage(this.categorySingleDetail._id);

  }
  saveImage(id) {
    console.log(id)
    let finalformdata: FormData = new FormData();
    finalformdata.append("file", (this.thumblineImage2File));
    finalformdata.append("filename", (id));
    this.makeapi.method(this.saveimageapi, finalformdata, 'file')
      .subscribe(
        data => {
          if (data.status == 'success') {
            this.assets1 = this.getimagapi + '?filename=' + this.categorySingleDetail._id + "&timestamp=" + new Date().getTime();
            console.log(this.assets1)

            this.getCategories();
            this.categorieforrm.reset();
            // this.getdata.showNotification('bottom', 'right', ' Categorie Edited successfully !!', "success");
          }
          else {
          }
        },
        Error => {
        });
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
