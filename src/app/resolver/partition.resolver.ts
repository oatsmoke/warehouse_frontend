import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
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

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.httpClient.post<any>(
      this.globalService.API_URL + "/api/" + route.paramMap.get("partition") + "/getById",
      {id: Number(route.paramMap.get("id"))})
  }
}
