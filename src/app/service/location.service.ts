import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface RequestLocation {
    date: string
    equipment_id: number
    way: string
    this_location: string
    where: string
    in_department: boolean
    company: number
    to_department: number
    to_employee: number
    to_contract: number
    transfer_type: string
    price: string
}

export interface ThisLocation {
    id: number
    partition: string
}

export interface LocationEquipment {
    to_department: { id: number }
    to_employee: { id: number }
    to_contract: { id: number }
}

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private httpClient: HttpClient,
                private globalService: GlobalService) {
    }

    transferTo(request: RequestLocation[]) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/location/transferTo", request)
    }

    getHistory(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/location/getHistory", {equipment: {id}})
    }

    delete(id: number) {
        return this.httpClient.post<any>(this.globalService.API_URL + "/api/location/delete", {id});
    }

  getById(id: number) {
      return this.httpClient.post<any>(this.globalService.API_URL + "/api/equipment/getById", {id})
    }
  getByIds(ids: number) {
    return this.httpClient.post<any>(this.globalService.API_URL + "/api/location/getByIds", ids)
  }
}
