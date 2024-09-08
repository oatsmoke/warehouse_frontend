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
      to_department: {id: 0},
      to_employee: {id: 0},
      to_contract: {id: 0}
    }
    if (route.paramMap.get("partition") == "department") {
      locationEquipment.to_department.id = Number(route.paramMap.get("id"))
    }
    if (route.paramMap.get("partition") == "employee") {
      locationEquipment.to_employee.id = Number(route.paramMap.get("id"))
    }
    if (route.paramMap.get("partition") == "contract") {
      locationEquipment.to_contract.id = Number(route.paramMap.get("id"))
    }
    return this.equipmentService.getByLocation(locationEquipment)
  }
}
