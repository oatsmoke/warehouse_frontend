import {Component, OnInit} from '@angular/core';
import {Category} from "../service/category.service";
import {Company, CompanyService} from "../service/company.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GlobalService} from "../service/global.service";
import {first} from "rxjs";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    companies: Company[] = []
    columns: string[] = ["title", "control"]

    constructor(private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private globalService: GlobalService,
                private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.pipe(first()).subscribe((value: any) => {
            this.companies = value.companyResolver
        })
    }

    getCompanies() {
        this.companyService.getAll().pipe(first()).subscribe((value: any) => {
            this.companies = value
        })
    }

    dialogCreateCompany() {
        this.dialog.open(DialogCompanyForm).afterClosed().pipe(first()).subscribe(_ => {
            this.getCompanies()
        })
    }

    dialogUpdateCompany(id: number) {
        this.companyService.getById(id).pipe(first()).subscribe((value: Category) => {
            const company = {
                id: id,
                title: value.title
            }
            this.dialog.open(DialogCompanyForm, {data: company}).afterClosed().pipe(first()).subscribe(_ => {
                this.getCompanies()
            });
        })
    }

    dialogDeleteCompany(id: number) {
        this.dialog.open(DialogCompanyDelete).afterClosed().pipe(first()).subscribe(value => {
            if (value) {
                this.companyService.delete(id).pipe(first()).subscribe({
                    next: _ => {
                        this.globalService.msg("Удалено!")
                        this.getCompanies()
                    },
                    error: error => {
                        this.globalService.msg(error.error.message)
                    }
                })
            }
        })
    }
}

@Component({
    selector: 'dialog-company-form', templateUrl: './dialog-company-form.html'
})
export class DialogCompanyForm {
}

@Component({
    selector: 'dialog-company-delete', templateUrl: './dialog-company-delete.html'
})
export class DialogCompanyDelete {
}