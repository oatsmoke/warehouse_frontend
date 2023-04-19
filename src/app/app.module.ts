import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatBadgeModule} from "@angular/material/badge";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTreeModule} from "@angular/material/tree";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {AuthFormComponent} from './auth-form/auth-form.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DialogContractCreateForm, DialogContractInputForm, MainComponent} from './main/main.component';
import {DialogEmployeeDelete, DialogEmployeeForm, EmployeeComponent} from './employee/employee.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {TokenInterceptor} from "./token.interceptor";
import {DepartmentComponent, DialogDepartmentDelete, DialogDepartmentForm} from './department/department.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {CategoryComponent, DialogCategoryDelete, DialogCategoryForm} from './category/category.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {DialogProfileDelete, DialogProfileForm, ProfileComponent} from './profile/profile.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {
    DialogContractDelete,
    DialogContractUpdateForm,
    DialogDepartmentStaffForm,
    DialogEquipmentDelete,
    DialogEquipmentForm,
    DialogEquipmentHistoryForm,
    DialogEquipmentTransferForm,
    EquipmentComponent
} from './equipment/equipment.component';
import {NoContentComponent} from './no-content/no-content.component';
import {EquipmentFormComponent} from './equipment-form/equipment-form.component';
import {EquipmentTransferFormComponent} from './equipment-transfer-form/equipment-transfer-form.component';
import {DepartmentStaffFormComponent} from './department-staff-form/department-staff-form.component';
import {EquipmentHistoryFormComponent} from './equipment-history-form/equipment-history-form.component';
import {HistoryComponent} from './history/history.component';
import {ContractFormComponent} from './contract-form/contract-form.component';
import {ContractInputFormComponent} from './contract-input-form/contract-input-form.component';
import {ShellComponent} from './shell/shell.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {DepartmentResolver} from "./resolver/department.resolver";
import {EmployeeResolver} from "./resolver/employee.resolver";
import {PartitionResolver} from "./resolver/partition.resolver";
import {EquipmentResolver} from "./resolver/equipment.resolver";
import {CategoryResolver} from "./resolver/category.resolver";
import {ProfileResolver} from "./resolver/profile.resolver";
import {GetUserResolver} from "./resolver/get-user.resolver";
import {CompanyComponent, DialogCompanyDelete, DialogCompanyForm} from './company/company.component';
import {CompanyResolver} from "./resolver/company.resolver";
import { CompanyFormComponent } from './company-form/company-form.component';

const mainRoutes: Routes = [
    {path: "home", component: HomeComponent},
    {
        path: ":partition/:id",
        component: EquipmentComponent,
        resolve: {partitionResolver: PartitionResolver, equipmentResolver: EquipmentResolver}
    },
    {path: "employee", component: EmployeeComponent, resolve: {employeeResolver: EmployeeResolver}},
    {path: "department", component: DepartmentComponent, resolve: {departmentResolver: DepartmentResolver}},
    {path: "category", component: CategoryComponent, resolve: {categoryResolver: CategoryResolver}},
    {path: "profile", component: ProfileComponent, resolve: {profileResolver: ProfileResolver}},
    {path: "company", component: CompanyComponent, resolve: {companyResolver: CompanyResolver}},
    {path: "**", redirectTo: "home"}
]

const appRoutes: Routes = [
    {path: 'no-access', component: AuthFormComponent},
    {
        path: '',
        component: MainComponent,
        children: mainRoutes,
        resolve: {getUserResolver: GetUserResolver}
    },
    {path: '**', redirectTo: ''}
]

@NgModule({
    declarations: [
        AuthFormComponent,
        DialogEmployeeForm,
        DialogEmployeeDelete,
        DialogDepartmentForm,
        DialogDepartmentDelete,
        DialogCategoryForm,
        DialogCategoryDelete,
        DialogProfileForm,
        DialogProfileDelete,
        DialogEquipmentForm,
        DialogEquipmentDelete,
        DialogEquipmentTransferForm,
        DialogDepartmentStaffForm,
        DialogEquipmentHistoryForm,
        DialogContractCreateForm,
        DialogContractUpdateForm,
        DialogContractDelete,
        DialogContractInputForm,
        DialogCompanyDelete,
        DialogCompanyForm,
        HomeComponent,
        MainComponent,
        EmployeeComponent,
        EmployeeFormComponent,
        ConfirmComponent,
        DepartmentComponent,
        DepartmentFormComponent,
        CategoryComponent,
        CategoryFormComponent,
        ProfileComponent,
        ProfileFormComponent,
        EquipmentComponent,
        NoContentComponent,
        EquipmentFormComponent,
        EquipmentTransferFormComponent,
        DepartmentStaffFormComponent,
        EquipmentHistoryFormComponent,
        HistoryComponent,
        ContractFormComponent,
        ContractInputFormComponent,
        ShellComponent,
        CompanyComponent,
        CompanyFormComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        {provide: MAT_DATE_LOCALE, useValue: {useUtc: true}}
    ],
    bootstrap: [ShellComponent]
})
export class AppModule {
}