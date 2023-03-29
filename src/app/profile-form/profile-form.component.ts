import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {first} from "rxjs";
import {Category, CategoryService} from "../service/category.service";
import {ProfileService} from "../service/profile.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent implements OnInit {
    changed = true
    head = "Добавить профиль"
    profileForm: FormGroup
    categories: Category[] = []
    title = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9а-яА-Яa-zA-Z- ]+"),
        Validators.maxLength(20)
    ])
    category = new FormControl("", Validators.required)

    constructor(private formBuilder: FormBuilder,
                private profileService: ProfileService,
                private categoryService: CategoryService,
                private globalService: GlobalService,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.profileForm = this.formBuilder.group({
            id: 0,
            title: this.title,
            category: this.category
        })
    }

    ngOnInit(): void {
        this.categoryService.getAll().pipe(first()).subscribe((value: any) => {
            this.categories = value
        })
        if (this.data != null) {
            this.changed = false
            this.head = "Изменить профиль"
            this.profileForm.setValue({
                id: this.data.id,
                title: this.data.title,
                category: this.data.category.id
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
        const value = this.profileForm.value
        this.profileService.create(value.title, value.category).pipe(first()).subscribe({
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
        const value = this.profileForm.value
        this.profileService.update(value.id, value.title, value.category).pipe(first()).subscribe({
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
            this.changed = !(this.profileForm.value.title == this.data.title &&
                this.profileForm.value.category == this.data.category.id)
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
