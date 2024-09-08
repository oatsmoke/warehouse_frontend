import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";
import {Employee} from "./employee.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    singIn(login: string, password: string) {
        return this.httpClient.post<Employee>(this.globalService.API_URL + "/auth/sing-in", {login, password})
    }

    getUser() {
        return this.httpClient.get<Employee>(this.globalService.API_URL + "/api/getUser")
    }

    exit() {

    }
}
