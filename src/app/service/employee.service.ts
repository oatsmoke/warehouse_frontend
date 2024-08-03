import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";
import {Department} from "./department.service";

export interface Employee {
  id: number
  name: string
  phone: string
  email: string
  registration_date: string
  authorization_date: string
  activate: boolean
  hidden: boolean
  department: Department
  role: string
  deleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(name: string, phone: string, email: string) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/create", {name, phone, email})
  }

  update(id: number, name: string, phone: string, email: string) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/update", {id, name, phone, email})
  }

  delete(id: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/delete", {id})
  }

  restore(id: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/restore", {id})
  }

  getAll(deleted: boolean) {
    return this.httpClient.post<Employee[]>(this.globalService.API_URL + "/api/employee/getAll", deleted)
  }

  getAllButAuth(deleted: boolean) {
    return this.httpClient.post<Employee[]>(this.globalService.API_URL + "/api/employee/getAllButAuth", deleted)
  }

  getAllButOne(id: number, deleted: boolean) {
    return this.httpClient.post<Employee[]>(this.globalService.API_URL + "/api/employee/getAllButOne", {id, deleted})
  }

  getById(id: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/getById", {id})
  }

  getFree() {
    return this.httpClient.post<Employee[]>(this.globalService.API_URL + "/api/employee/getFree", "")
  }

  getByDepartment(ids: number[], departmentId: number) {
    return this.httpClient.post<Employee[]>(this.globalService.API_URL + "/api/employee/getByDepartment", {
      ids,
      departmentId
    })
  }

  addToDepartment(id: number, departmentId: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/addToDepartment", {
      id,
      department: {id: departmentId}
    })
  }

  removeFromDepartment(id: number, departmentId: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/removeFromDepartment", [id, departmentId])
  }

  activate(id: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/activate", {id})
  }

  deactivate(id: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/deactivate", {id})
  }

  resetPassword(id: number) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/resetPassword", {id})
  }

  changeRole(id: number, role: string) {
    return this.httpClient.post<Employee>(this.globalService.API_URL + "/api/employee/changeRole", {id, role})
  }
}
