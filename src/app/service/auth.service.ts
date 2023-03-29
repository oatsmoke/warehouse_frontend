import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private httpClient: HttpClient) {
    }

    singIn(login: string, password: string) {
        return this.httpClient.post<any>("http://localhost:2020/auth/sing-in", {login, password})
    }

    getUser() {
        return this.httpClient.get<any>("http://localhost:2020/api/getUser")
    }

    exit() {

    }
}
