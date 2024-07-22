import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Department, DepartmentService} from "../service/department.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentResolver implements Resolve<any> {
  constructor(private departmentService: DepartmentService) {
  }

  resolve(): Observable<Department[]> {
    return this.departmentService.getAll(true)
  }
}
