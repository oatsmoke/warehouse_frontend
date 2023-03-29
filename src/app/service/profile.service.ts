import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "./category.service";

export interface Profile {
    id: number
    title: string
    category: Category
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) {
    }

    create(title: string, category: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/profile/create", {title, category: {id: category}})
    }

    getById(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/profile/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>("http://localhost:2020/api/profile/getAll");
    }

    update(id: number, title: string, category: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/profile/update", {
            id,
            title,
            category: {id: category}
        });
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/profile/delete", {id});
    }
}
