import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "./profile.service";
import {Employee} from "./employee.service";
import {Department} from "./department.service";
import {Contract} from "./contract.service";
import {LocationEquipment, RequestLocation} from "./location.service";
import {GlobalService} from "./global.service";
import {Company} from "./company.service";

export interface Equipment {
  id: number
  serial_number: string
  profile: Profile
  deleted: boolean
}

export interface ThisEquipment {
  id: number
  date: string
  code: string
  equipment: Equipment
  employee: Employee
  company: Company
  to_department: Department
  to_employee: Employee
  to_contract: Contract
  transfer_type: string
  price: string
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(date: string, company: number, serialNumber: string, profile: number, requestLocation: RequestLocation[]) {
    return this.httpClient.post<Equipment>(this.globalService.API_URL + "/api/equipment/create", {
        location: {
          date,
          company: {id: company},
          equipment:
            {
              serial_number: serialNumber,
              profile:
                {
                  id: profile
                }
            }
        },
        request_location: requestLocation,
      }
    )
  }

  update(id: number, serial_number: string, profile: number) {
    return this.httpClient.post<Equipment>(this.globalService.API_URL + "/api/equipment/update", {
      id,
      serial_number,
      profile: {id: profile}
    })
  }

  delete(id: number) {
    return this.httpClient.post<Equipment>(this.globalService.API_URL + "/api/equipment/delete", {id})
  }

  restore(id: number) {
    return this.httpClient.post<Equipment>(this.globalService.API_URL + "/api/equipment/restore", {id})
  }

  getAll() {
    return this.httpClient.post<Equipment[]>(this.globalService.API_URL + "/api/equipment/getAll", {})
  }

  // getById(id: number) {
  //   return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/getById", {id})
  // }

  getByIds(ids: number[]) {
    return this.httpClient.post<Equipment[]>(this.globalService.API_URL + "/api/equipment/getByIds", ids)
  }

  getByLocation(location: LocationEquipment) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/location/getByLocation", location)
  }

  reportByCategory(departmentId: number, date: string) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/reportByCategory", {
      departmentId,
      date
    })
  }

  findBySerialNumber(str: string) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/findBySerialNumber", {"search": str})
  }
}
