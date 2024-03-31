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
  serialNumber: string
  profile: Profile
}

export interface ThisEquipment {
  id: number
  date: number
  code: string
  equipment: Equipment
  employee: Employee
  company: Company
  toDepartment: Department
  toEmployee: Employee
  toContract: Contract
  transferType: string
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
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/create", {
        location: {
          date: new Date(date).getTime() / 1000,
          company: {id: company},
          equipment:
            {
              serialNumber: serialNumber,
              profile:
                {
                  id: profile
                }
            }
        },
        requestLocation
      }
    )
  }

  getById(id: number) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/getById", {id})
  }

  getByIds(ids: []) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/getByIds", {ids})
  }

  getByLocation(location: LocationEquipment) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/getByLocation", location)
  }

  getAll() {
    return this.httpClient.get<any>(this.globalService.API_URL + "/api/equipment/getAll")
  }

  update(id: number, serialNumber: string, profile: number) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/update", {
      id,
      serialNumber,
      profile: {id: profile}
    })
  }

  delete(id: number) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/delete", {id})
  }

  reportByCategory(departmentId: number, date: string) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/reportByCategory", {
      departmentId,
      date: new Date(date).getTime() / 1000
    })
  }
}
