import {NgModule} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {SidenavToolbarComponent} from './dashboard/components/sidenav-toolbar/sidenav-toolbar.component';
import {FunctionDetailsComponent} from './dashboard/components/function-details/function-details.component';
import {MasterDataComponent} from './dashboard/components/master-data/master-data.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {HeaderFormatPipe} from './model/header-format.pipe';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
import {AddUserComponent} from './dashboard/components/master-data/add-user/add-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from "@angular/material/select";
import {AddHiraComponent} from './dashboard/components/function-details/add-hira/add-hira.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsComponent} from './dashboard/components/forms/forms.component';
import {HiraFormComponent} from './dashboard/components/forms/hira-form/hira-form.component';
import {MatChipsModule} from "@angular/material/chips";
import {SharedTableComponent} from './dashboard/components/shared-table/shared-table.component';
import {
  ViewFunctionDetailsComponent
} from './dashboard/components/function-details/view-function-details/view-function-details.component';
import {
  SharedApproveDialogComponent
} from './dashboard/components/shared-approve-dialog/shared-approve-dialog.component';
import {SharedRejectDialogComponent} from './dashboard/components/shared-reject-dialog/shared-reject-dialog.component';
import {ProfileComponent} from './dashboard/components/profile/profile.component';
import {SharedLoaderComponent} from './dashboard/components/shared-loader/shared-loader.component';
import {SpinnerInterceptor} from "./inteceptor/spinner.interceptor";
import { CommentsComponent } from './dashboard/components/comments/comments.component';
import { TimeAgoPipe } from './model/time-ago.pipe';
import { UserTableComponent } from './dashboard/components/master-data/user-table/user-table.component';
import { PermissionTableComponent } from './dashboard/components/master-data/permission-table/permission-table.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { HiraTableComponent } from './dashboard/components/function-details/hira-table/hira-table.component';
import { AddEaiComponent } from './dashboard/components/function-details/add-eai/add-eai.component';
import { EaiTableComponent } from './dashboard/components/function-details/eai-table/eai-table.component';
import { AddArrComponent } from './dashboard/components/function-details/add-arr/add-arr.component';
import { InnerDashboardComponent } from './dashboard/components/inner-dashboard/inner-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { BarGraphComponent } from './dashboard/components/inner-dashboard/bar-graph/bar-graph.component';
import { HeatMapComponent } from './dashboard/components/inner-dashboard/heat-map/heat-map.component';
import { FilterDialogComponent } from './dashboard/components/inner-dashboard/filter-dialog/filter-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavToolbarComponent,
    FunctionDetailsComponent,
    MasterDataComponent,
    HeaderFormatPipe,
    AddUserComponent,
    AddHiraComponent,
    FormsComponent,
    HiraFormComponent,
    SharedTableComponent,
    ViewFunctionDetailsComponent,
    SharedApproveDialogComponent,
    SharedRejectDialogComponent,
    ProfileComponent,
    SharedLoaderComponent,
    CommentsComponent,
    TimeAgoPipe,
    UserTableComponent,
    PermissionTableComponent,
    HiraTableComponent,
    AddEaiComponent,
    EaiTableComponent,
    AddArrComponent,
    InnerDashboardComponent,
    BarGraphComponent,
    HeatMapComponent,
    FilterDialogComponent,
  ],
  imports: [
    MatDialogModule,
    CdkTableModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule,
    MatExpansionModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent,]
})
export class AppModule {
}
