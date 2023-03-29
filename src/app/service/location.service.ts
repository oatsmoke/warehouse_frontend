import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface RequestLocation {
    equipmentId: number
    thisLocation: string
    date: number
    where: string
    inDepartment: boolean
    toDepartment: number
    toEmployee: number
    toContract: number
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

    constructor(private httpClient: HttpClient) {
    }

    transferTo(request: RequestLocation[]) {
        return this.httpClient.post<any>("http://localhost:2020/api/location/transferTo", request)
    }

    getHistory(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/location/getHistory", {equipment: {id}})
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/location/delete", {id});
    }
}
