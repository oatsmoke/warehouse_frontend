import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {GlobalService} from "./global.service";
import {catchError, tap} from "rxjs";
import {Employee} from "./employee.service";

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    constructor(private authService: AuthService,
                private globalService: GlobalService) {
    }

    Init() {
        return this.authService.getUser().pipe(
            tap((value:Employee) => {
                this.globalService.employee = value
            }),
            catchError(
                _ => {
                    return []
                }
            )
        )
    }
}
