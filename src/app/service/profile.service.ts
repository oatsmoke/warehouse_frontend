import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "./category.service";
import {GlobalService} from "./global.service";

export interface Profile {
    id: number
    title: string
    category: Category
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    create(title: string, category: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/profile/create", {
            title,
            category: {id: category}
        })
    }

    getById(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/profile/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/profile/getAll");
    }

    update(id: number, title: string, category: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/profile/update", {
            id,
            title,
            category: {id: category}
        });
    }

    delete(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/profile/delete", {id});
    }
}
