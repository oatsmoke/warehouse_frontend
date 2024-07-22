import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Profile, ProfileService} from "../service/profile.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
  constructor(private profileService: ProfileService) {
  }

  resolve(): Observable<Profile[]> {
    return this.profileService.getAll(true)
  }
}
