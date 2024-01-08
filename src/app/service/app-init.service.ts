import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {GlobalService} from "./global.service";
import {catchError, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    constructor(private authService: AuthService,
                private globalService: GlobalService) {
    }

    Init() {
        return this.authService.getUser().pipe(
            tap(value => {
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
