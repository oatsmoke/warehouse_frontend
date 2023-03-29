import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DepartmentService} from "../service/department.service";

@Injectable({
    providedIn: 'root'
})
export class DepartmentResolver implements Resolve<any> {
    constructor(private departmentService: DepartmentService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.departmentService.getAll()
    }
}
