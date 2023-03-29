import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Contract {
    id: number
    number: string
    address: string
}

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    constructor(private httpClient: HttpClient) {
    }

    create(number: number, address: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/contract/create", {number, address})
    }

    getById(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/contract/getById", {id});
    }

    getAll() {
        return this.httpClient.get<any>("http://localhost:2020/api/contract/getAll");
    }

    update(id: number, number: number, address: string) {
        return this.httpClient.post<any>("http://localhost:2020/api/contract/update", {id, number, address});
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/contract/delete", {id});
    }
}
