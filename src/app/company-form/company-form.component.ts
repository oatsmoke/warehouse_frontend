import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../service/global.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CompanyService} from "../service/company.service";
import {first} from "rxjs";

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
    changed = true
    head = "Добавить компанию"
    companyForm: FormGroup
    title = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
        Validators.maxLength(20)
    ])

    constructor(private formBuilder: FormBuilder,
                private companyService: CompanyService,
                private globalService: GlobalService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.companyForm = this.formBuilder.group({
            id: 0,
            title: this.title
        })
    }

    ngOnInit(): void {
        if (this.data != null) {
            this.changed = false
            this.head = "Изменить компанию"
            this.companyForm.setValue({
                id: this.data.id,
                title: this.data.title
            })
        }
    }

    ok() {
        if (this.title.value.trim() != "") {
            if (this.data == null) {
                this.create()
            } else {
                this.update()
            }
        }
    }

    create() {
        const value = this.companyForm.value
        this.companyService.create(value.title).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    update() {
        const value = this.companyForm.value
        this.companyService.update(value.id, value.title).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    check() {
        if (this.data != null) {
            this.changed = !(this.companyForm.value.title == this.data.title)
        }
    }

    removeSpaces() {
        this.title.setValue(this.title.value.replace(/ +/g, ' ').trim())
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }

    close() {
        this.globalService.close()
    }
}
