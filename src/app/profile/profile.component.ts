import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {Profile, ProfileService} from "../service/profile.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    profiles: Profile[] = []
    columns: string[] = ["title", "category", "control"];

    constructor(private activatedRoute: ActivatedRoute,
                private globalService: GlobalService,
                private profileService: ProfileService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.pipe(first()).subscribe((value: any) => {
            this.profiles = value.profileResolver
        })
    }

    dialogCreateProfile() {
        this.dialog.open(DialogProfileForm).afterClosed().pipe(first()).subscribe(_ => {
            this.getProfiles()
        })
    }

    getProfiles() {
        this.profileService.getAll().pipe(first()).subscribe((value: any) => {
            this.profiles = value
        })
    }

    updateProfile(id: number) {
        this.profileService.getById(id).pipe(first()).subscribe((value: Profile) => {
            const profile = {
                id: id,
                title: value.title,
                category: value.category
            }
            this.dialog.open(DialogProfileForm, {data: profile}).afterClosed().pipe(first()).subscribe(_ => {
                this.getProfiles()
            })
        })
    }

    deleteProfile(id: number) {
        this.dialog.open(DialogProfileDelete).afterClosed().pipe(first()).subscribe(value => {
            if (value) {
                this.profileService.delete(id).pipe(first()).subscribe({
                    next: _ => {
                        this.globalService.msg("Удалено!")
                        this.getProfiles()
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
    selector: 'dialog-profile-form', templateUrl: './dialog-profile-form.html'
})
export class DialogProfileForm {
}

@Component({
    selector: 'dialog-profile-delete', templateUrl: './dialog-profile-delete.html'
})
export class DialogProfileDelete {
}