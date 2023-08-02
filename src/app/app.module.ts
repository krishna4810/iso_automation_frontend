import {NgModule} from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
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
import {PermissionTableComponent} from './dashboard/components/master-data/permission-table/permission-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HeaderFormatPipe} from './model/header-format.pipe';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
import {UserTableComponent} from './dashboard/components/master-data/user-table/user-table.component';
import {AddUserComponent} from './dashboard/components/master-data/user-table/add-user/add-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from "@angular/material/select";
import { HiraTableComponent } from './dashboard/components/function-details/hira-table/hira-table.component';
import { AddHiraComponent } from './dashboard/components/function-details/add-hira/add-hira.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { FormsComponent } from './dashboard/components/forms/forms.component';
import { HiraFormComponent } from './dashboard/components/forms/hira-form/hira-form.component';
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavToolbarComponent,
    FunctionDetailsComponent,
    MasterDataComponent,
    PermissionTableComponent,
    HeaderFormatPipe,
    UserTableComponent,
    AddUserComponent,
    HiraTableComponent,
    AddHiraComponent,
    FormsComponent,
    HiraFormComponent,

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
        MatPaginatorModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatChipsModule
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
