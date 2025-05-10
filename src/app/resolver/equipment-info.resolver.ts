import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LocationService} from "../service/location.service";

@Injectable({
  providedIn: 'root'
})
export class EquipmentInfoResolver implements Resolve<any> {
  constructor(private locationService: LocationService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.locationService.getById(Number(route.paramMap.get("id")))
  }
}
