import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";
import {Department} from "./department.service";

export interface Employee {
    id: number
    name: string
    phone: string
    email: string
    registrationDate: Date
    authorizationDate: Date
    activate: boolean
    hidden: boolean
    department: Department
    role: string
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    create(name: string, phone: string, email: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/create", {name, phone, email})
    }

    getById(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/getById", {id})
    }

    getByDepartment(ids: number[], id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/getByDepartment", {ids, id})
    }

    getAll() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/employee/getAll")
    }

    getFree() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/employee/getFree")
    }

    getAllButAuth() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/employee/getAllButAuth")
    }

    getAllButOne(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/getAllButOne", {id})
    }

    addToDepartment(id: number, department: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/addToDepartment", {
            id,
            department: {id: department}
        })
    }

    removeFromDepartment(idDepartment: number, idEmployee: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/removeFromDepartment", [idDepartment, idEmployee])
    }

    update(id: number, name: string, phone: string, email: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/update", {id, name, phone, email})
    }

    delete(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/delete", {id})
    }

    activate(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/activate", {id})
    }

    deactivate(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/deactivate", {id})
    }

    resetPassword(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/resetPassword", {id})
    }

    changeRole(id: number, role: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/employee/changeRole", {id, role})
    }
}
