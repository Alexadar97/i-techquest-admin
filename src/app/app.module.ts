import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebserviceService } from './services/webservice.service';
import { DatatransferService } from './services/datatransfer.service';
import { CanDeactivateGuard } from './services/deactivate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { AuthGuard } from './services/canactivate.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from './components/components.module';
import { CreateExamComponent } from './exam-home/create-exam/create-exam.component';
import { TechnologyComponent } from './technology/technology.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExamComponent } from './exam-home/exam/exam.component';
import { ManualEntryComponent } from './exam-home/manual-entry/manual-entry.component';
import { ExamHomeComponent } from './exam-home/exam-home.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateExamComponent,
    TechnologyComponent,
    CategoriesComponent,
    ExamComponent,
    ManualEntryComponent,
    ExamHomeComponent,
    ChangepasswordComponent,
    LoginComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    NgxEditorModule,
    NgxPaginationModule,
    HttpModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    OrderModule
  ],
  providers: [DatatransferService,WebserviceService,CanDeactivateGuard,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
