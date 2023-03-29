import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {CategoryService} from "../service/category.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
    changed = true
    head = "Добавить категорию"
    categoryForm: FormGroup
    title = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
        Validators.maxLength(20)
    ])

    constructor(private formBuilder: FormBuilder,
                private categoryService: CategoryService,
                private globalService: GlobalService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.categoryForm = this.formBuilder.group({
            id: 0,
            title: this.title
        })
    }

    ngOnInit(): void {
        if (this.data != null) {
            this.changed = false
            this.head = "Изменить категорию"
            this.categoryForm.setValue({
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
        const value = this.categoryForm.value
        this.categoryService.create(value.title).pipe(first()).subscribe({
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
        const value = this.categoryForm.value
        this.categoryService.update(value.id, value.title).pipe(first()).subscribe({
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
            this.changed = !(this.categoryForm.value.title == this.data.title)
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
