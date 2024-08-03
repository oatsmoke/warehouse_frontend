import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {EquipmentService} from "../service/equipment.service";
import {LocationEquipment} from "../service/location.service";

@Injectable({
  providedIn: 'root'
})
export class EquipmentResolver implements Resolve<any> {
  constructor(private equipmentService: EquipmentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let locationEquipment: LocationEquipment = {
      toDepartment: {id: 0},
      toEmployee: {id: 0},
      toContract: {id: 0}
    }
    if (route.paramMap.get("partition") == "department") {
      locationEquipment.toDepartment.id = Number(route.paramMap.get("id"))
    }
    if (route.paramMap.get("partition") == "employee") {
      locationEquipment.toEmployee.id = Number(route.paramMap.get("id"))
    }
    if (route.paramMap.get("partition") == "contract") {
      locationEquipment.toContract.id = Number(route.paramMap.get("id"))
    }
    return this.equipmentService.getByLocation(locationEquipment)
  }
}
