import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface RequestLocation {
    date: number
    equipmentId: number
    way: string
    thisLocation: string
    where: string
    inDepartment: boolean
    company: number
    toDepartment: number
    toEmployee: number
    toContract: number
    transferType: string
    price: number
}

export interface ThisLocation {
    id: number
    partition: string
}

export interface LocationEquipment {
    toDepartment: { id: number }
    toEmployee: { id: number }
    toContract: { id: number }
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
}
