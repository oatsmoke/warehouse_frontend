import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Employee, EmployeeService} from "../service/employee.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<Employee[]> {
  constructor(private employeeService: EmployeeService) {
  }

  resolve(): Observable<Employee[]> {
    return this.employeeService.getAllButAuth(true)
  }
}
