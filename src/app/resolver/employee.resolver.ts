import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {EmployeeService} from "../service/employee.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeResolver implements Resolve<any> {
    constructor(private employeeService: EmployeeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.employeeService.getAllButAuth()
    }
}
