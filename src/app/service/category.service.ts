import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Category {
    id: number
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    create(title: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/category/create", {title})
    }

    getById(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/category/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/category/getAll");
    }

    update(id: number, title: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/category/update", {
            id,
            title
        });
    }

    delete(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/category/delete", {id});
    }
}
