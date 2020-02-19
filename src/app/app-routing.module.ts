import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

import { TechnologyComponent } from './technology/technology.component';
import { CategoriesComponent } from './categories/categories.component';

import { ExamComponent } from './exam-home/exam/exam.component';
import { ExamHomeComponent } from './exam-home/exam-home.component';
import { ManualEntryComponent } from './exam-home/manual-entry/manual-entry.component';
import { CreateExamComponent } from './exam-home/create-exam/create-exam.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'exam-home', pathMatch: 'full' },
      { path: 'exam-home', component: ExamHomeComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'exam' },
          { path: 'exam', component: ExamComponent },
          { path: 'createexam', component: CreateExamComponent },
          { path: 'manual-entry', component: ManualEntryComponent },
        ]
      },

      { path: 'technology', component: TechnologyComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      
    ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
