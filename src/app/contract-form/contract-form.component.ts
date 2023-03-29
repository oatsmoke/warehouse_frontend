import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {ContractService} from "../service/contract.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
    changed = true
    head = "Добавить абонента"
    contractForm: FormGroup
    number = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.maxLength(10)
    ])
    address = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9а-яА-Я-/. ]+"),
        Validators.maxLength(50)
    ])

    constructor(private formBuilder: FormBuilder,
                private contractService: ContractService,
                private globalService: GlobalService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.contractForm = this.formBuilder.group({
            id: 0,
            number: this.number,
            address: this.address
        })
    }

    ngOnInit(): void {
        if (this.data != null) {
            this.changed = false
            this.head = "Изменить абонента"
            this.contractForm.setValue({
                id: this.data.id,
                number: this.data.number,
                address: this.data.address
            })
        }
    }

    ok() {
        if (this.address.value.trim() != "") {
            if (this.data == null) {
                this.create()
            } else {
                this.update()
            }
        }
    }

    create() {
        const value = this.contractForm.value
        this.contractService.create(value.number, value.address).pipe(first()).subscribe({
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
        const value = this.contractForm.value
        this.contractService.update(value.id, value.number, value.address).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: (error) => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    check() {
        if (this.data != null) {
            this.changed = !(this.contractForm.value.number == this.data.number &&
                this.contractForm.value.address == this.data.address)
        }
    }

    removeSpaces() {
        this.address.setValue(this.address.value.replace(/ +/g, ' ').trim())
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }

    close() {
        this.globalService.close()
    }
}
