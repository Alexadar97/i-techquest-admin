import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WebserviceService } from '../services/webservice.service';
import { DatatransferService } from '../services/datatransfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

declare var $;

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {

  private addTechnology = this.getdata.itequestconstant + 'addTechnology';
  private getTechnologyapi = this.getdata.itequestconstant + 'getTechnologies';
  private getCategoriesapi = this.getdata.itequestconstant + 'getCategories';
  private editTeachenologytapi = this.getdata.itequestconstant + 'updateTechnology';
  private deleteTeachenologytapi = this.getdata.itequestconstant + 'deleteTechnology';

  technology : any[]
  technologyform:FormGroup; 
  EditcreateCategory:FormGroup; 
  filter:any;
  page =1;
  
  constructor(private Formbuilder: FormBuilder, private router: Router,private makeapi: WebserviceService, private getdata: DatatransferService,private orderPipe: OrderPipe) {

    
    this.technologyform = this.Formbuilder.group({
      "Categoryid": [null, Validators.compose([Validators.required])],
      "name": [null, Validators.compose([Validators.required])],
    })
    this.EditcreateCategory = Formbuilder.group({
      "Categoryid": [null, Validators.compose([Validators.required])],
      "name": [null, Validators.compose([Validators.required])],
    });
   }
  ngOnInit() {
    this.getCategories();

  }
  allCategorys=[];
  allTechnology=[];

  getCategories() {
    let reqdata = "";
    return this.makeapi.method(this.getCategoriesapi, reqdata, "post")
      .subscribe(data => {
        this.allCategorys = data;
        if(data.length>0){
          this.gettechnology(data[0]._id);
        }
       
      },
        Error => {
        });
  }
  categoryid : any;
  gettechnology(value){
      return this.makeapi.method(this.getTechnologyapi+"?categoryid="+value, "", "post")
        .subscribe(data => {
          this.categoryid = data[0]._id;
          if( data[0]['sub']){
            this.allTechnology = data[0].sub;
            console.log(this.addTechnology)
            
          }else{
              this.allTechnology = [];
          }
        },
          Error => {
          });
  }
  addcategory() {
    if(this.technologyform.invalid) {
      this.markFormGroupTouched(this.technologyform);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger")
    }
    else  {
      let reqdata = "technologyname=" + this.technologyform.value.name + "&categoryid=" + this.technologyform.value.Categoryid
      return this.makeapi.method(this.addTechnology, reqdata, "post")
        .subscribe(data => {
          if (data.status == 'success' && data.isexists != true) {
          $("#sel2").val(this.technologyform.value.Categoryid)
          this.gettechnology(this.technologyform.value.Categoryid);
          this.technologyform.reset();
          this.getdata.showNotification('bottom', 'right', 'Category Name Added Successfully !!', "success");
           
          }
          else if (data.isexists == true) {
            this.getdata.showNotification('bottom', 'right', 'Title of the exam already exists !!', "danger");
          }
        },
          Error => {
          });
    }
  }
  delete_id: any;
  deletecategory(id) {
    this.delete_id = id;
    $("#delete").modal("show");
  }
  Confirmdeletecategory() {
    let reqdata = "subcateid=" + this.delete_id + "&categoryid=" + this.categoryid;
    return this.makeapi.method(this.deleteTeachenologytapi, reqdata, "post")
      .subscribe(data => {
        if (data.status == "success") {
          this. gettechnology(this.categoryid);
          $("#delete").modal("hide");
          this.getdata.showNotification('bottom', 'right', ' Category Deleted Successfully !!!', "success");
         
        }
        else {
          this.getdata.showNotification('bottom', 'right', ' Category Not Deleted !!!', "danger");
          $("#delete").modal("hide");
        }
      },
        Error => {
        });
  }
  edit_id: any;
  editcategory(id,index) {
    this.edit_id = id;
    var getdata = this.EditcreateCategory.value;
    getdata.name = this.allTechnology[index].name
    getdata.Categoryid =  this.categoryid;
    this.EditcreateCategory.patchValue(getdata)
    $("#edit").modal("show");
  }
  Confirmeditcategory() {
    // if (this.EditcreateCategory.invalid) {
    //   this.markFormGroupTouched(this.EditcreateCategory);
    //   this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
    // }
    // else {
      let reqdata = "subcateid=" + this.edit_id + "&categoryid=" + this.EditcreateCategory.value.Categoryid + "&technologyname=" + this.EditcreateCategory.value.name
      return this.makeapi.method(this.editTeachenologytapi, reqdata, "post")
        .subscribe(data => {
          // if (data.status == 'success' && data.isExist != 'true') {
          //   $("#edit").modal("hide");
          //   this.getdata.showNotification('bottom', 'right', ' Category Edited Successfully !!!', "success");
          this.getdata.geteditexam(data.Categoryid, this.EditcreateCategory.value.size, 1)
          this.gettechnology(this.EditcreateCategory.value.Categoryid);
            $("#edit").modal("hide");
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
     
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  }


