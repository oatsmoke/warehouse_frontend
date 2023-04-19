import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompanyService} from "../service/company.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyResolver implements Resolve<any> {
    constructor(private companyService: CompanyService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.companyService.getAll()
    }
}
