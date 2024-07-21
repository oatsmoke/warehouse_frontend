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
  columns: string[] = ["title", "category", "deleted", "control"];

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

  getProfiles() {
    this.profileService.getAll(true).pipe(first()).subscribe((value: any) => {
      this.profiles = value
    })
  }

  dialogCreateProfile() {
    this.dialog.open(DialogProfileForm).afterClosed().pipe(first()).subscribe(_ => {
      this.getProfiles()
    })
  }

  dialogUpdateProfile(id: number) {
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

  dialogDeleteProfile(id: number) {
    this.dialog.open(DialogProfileDelete, {data: this.globalService.delete}).afterClosed().pipe(first()).subscribe(value => {
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

  dialogRestoreProfile(id: number) {
    this.dialog.open(DialogProfileRestore, {data: this.globalService.restore}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.profileService.restore(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Восстановлено!")
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

@Component({
  selector: 'dialog-profile-restore', templateUrl: './dialog-profile-restore.html'
})
export class DialogProfileRestore {
}
