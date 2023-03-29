import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Category {
    id: number
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient) {
    }

    create(title: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/category/create", {title})
    }

    getById(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/category/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>("http://localhost:2020/api/category/getAll");
    }

    update(id: number, title: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/category/update", {id, title});
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/category/delete", {id});
    }
}
