import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { ListTableComponent } from './modules/list-table/list-table.component';
import { LoginComponent } from './modules/login/login.component';
import { QuestionManagementComponent } from './modules/question-management/question-management.component';
import { SetTableComponent } from './modules/set-table/set-table.component';
import { UserManagementComponent } from './modules/user-management/user-management.component';
import { AuthGuardService as AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { path: '', 
  redirectTo: 'login', 
  pathMatch: 'full', 
  // canActivate: [AuthGuard] 
  },
  {
    path: '',
    component: DefaultComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'list-table', component: ListTableComponent },
      { path: 'set-table', component: SetTableComponent },
      { path: 'set-table/:id', component: SetTableComponent },
      { path: 'user', component: UserManagementComponent },
      { path: 'login', component: LoginComponent },
      { path: 'question', component: QuestionManagementComponent },
    ]
  },
  { path: '**', redirectTo: '' }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
