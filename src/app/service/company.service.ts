import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Company {
    id: number
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    create(title: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/company/create", {title})
    }

    getById(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/company/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>(this.globalService.API_URL + "/api/company/getAll");
    }

    update(id: number, title: string) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/company/update", {
            id,
            title
        });
    }

    delete(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/company/delete", {id});
    }
}
