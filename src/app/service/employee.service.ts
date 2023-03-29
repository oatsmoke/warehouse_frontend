import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Employee {
    id: number
    name: string
    phone: string
    email: string
    registrationDate: Date
    authorizationDate: Date
    activate: boolean
    hidden: boolean
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private httpClient: HttpClient) {
    }

    create(name: string, phone: string, email: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/create", {name, phone, email})
    }

    getById(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/getById", {id})
    }

    getByDepartment(ids: number[], id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/getByDepartment", {ids, id})
    }

    getAll() {
        return this.httpClient.get<any>("http://localhost:2020/api/employee/getAll")
    }

    getFree() {
        return this.httpClient.get<any>("http://localhost:2020/api/employee/getFree")
    }

    getAllButAuth() {
        return this.httpClient.get<any>("http://localhost:2020/api/employee/getAllButAuth")
    }

    getAllButOne(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/getAllButOne", {id})
    }

    addToDepartment(id: number, department: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/addToDepartment", {
            id,
            department: {id: department}
        })
    }

    removeFromDepartment(idDepartment: number, idEmployee: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/removeFromDepartment", [idDepartment, idEmployee]);
    }

    update(id: number, name: string, phone: string, email: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/update", {id, name, phone, email})
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/delete", {id});
    }

    activate(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/activate", {id});
    }

    deactivate(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/deactivate", {id});
    }

    resetPassword(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/employee/resetPassword", {id});
    }
}
