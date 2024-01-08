import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from "./service/global.service";

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor(private globalService: GlobalService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.globalService.employee.role == "ADMIN") {
            return true
        } else {
            this.router.navigate(["nome"]).then()
            return false
        }
    }

}
