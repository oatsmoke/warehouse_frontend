import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Department {
    id: number
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private httpClient: HttpClient) {
    }

    create(title: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/department/create", {title})
    }

    getById(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/department/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>("http://localhost:2020/api/department/getAll");
    }

    getAllButOne(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/department/getAllButOne", {id});
    }

    update(id: number, title: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/department/update", {id, title});
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/department/delete", {id});
    }
}
