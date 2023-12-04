import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {FunctionDetailsComponent} from "./dashboard/components/function-details/function-details.component";
import {MasterDataComponent} from "./dashboard/components/master-data/master-data.component";
import {SidenavToolbarComponent} from "./dashboard/components/sidenav-toolbar/sidenav-toolbar.component";
import {FormsComponent} from "./dashboard/components/forms/forms.component";
import {
  ViewFunctionDetailsComponent
} from "./dashboard/components/function-details/view-function-details/view-function-details.component";
import {CreatorsComponent} from "./dashboard/components/creators/creators.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: SidenavToolbarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'functionalDetails',
        component: FunctionDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'functionalDetails/:id',
        component: ViewFunctionDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'masterData',
        component: MasterDataComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'forms',
        component: FormsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'creators',
        component: CreatorsComponent,
        canActivate: [AuthGuard]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
