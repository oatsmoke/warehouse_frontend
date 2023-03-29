import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs";
import {AuthService} from "../service/auth.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-auth-form', templateUrl: './auth-form.component.html', styleUrls: ['./auth-form.component.css']
})

export class AuthFormComponent implements OnInit {
    authForm: FormGroup
    login = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9a-zA-Z]+"),
        Validators.maxLength(11)
    ])
    password = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9a-zA-Z]+"),
        Validators.maxLength(20)
    ])

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private globalService: GlobalService,
                private router: Router) {
        this.authForm = this.formBuilder.group({
            login: this.login,
            password: this.password
        })
    }

    ngOnInit(): void {
    }

    submit() {
        const value = this.authForm.value
        this.authService.singIn(value.login, value.password).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.router.navigate(["/home"]).then()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }
}
