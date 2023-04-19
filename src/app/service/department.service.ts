import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Department {
    id: number
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    create(title: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/department/create", {title})
    }

    getById(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/department/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/department/getAll");
    }

    getAllButOne(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/department/getAllButOne", {id});
    }

    update(id: number, title: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/department/update", {id, title});
    }

    delete(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/department/delete", {id});
    }
}
