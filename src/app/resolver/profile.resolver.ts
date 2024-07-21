import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfileService} from "../service/profile.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
    constructor(private profileService: ProfileService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.profileService.getAll(true)
    }
}
