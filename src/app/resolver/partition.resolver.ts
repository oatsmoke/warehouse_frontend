import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from "../service/global.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PartitionResolver implements Resolve<any> {
    constructor(private globalService: GlobalService,
                private httpClient: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        route.url.map(value => this.globalService.path = value.path)
        return this.httpClient.post<any>(
            "http://localhost:2020/api/" + route.paramMap.get("partition") + "/getById",
            {id: Number(route.paramMap.get("id"))})
    }
}
