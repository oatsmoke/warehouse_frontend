import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "./profile.service";
import {Employee} from "./employee.service";
import {Department} from "./department.service";
import {Contract} from "./contract.service";
import {LocationEquipment, RequestLocation} from "./location.service";

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
    toDepartment: Department
    toEmployee: Employee
    toContract: Contract
}

@Injectable({
    providedIn: 'root'
})
export class EquipmentService {

    constructor(private httpClient: HttpClient) {
    }

    create(date: string, serialNumber: string, profile: number, requestLocation: RequestLocation[]) {
        return this.httpClient.post<any>("http://localhost:2020/api/equipment/create", {
                location: {
                    date: new Date(date).getTime() / 1000,
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
        return this.httpClient.post<any>("http://localhost:2020/api/equipment/getById", {id})
    }

    getByIds(ids: []) {
        return this.httpClient.post<any>("http://localhost:2020/api/equipment/getByIds", {ids})
    }

    getByLocation(location: LocationEquipment) {
        return this.httpClient.post<any>("http://localhost:2020/api/equipment/getByLocation", location)
    }

    getAll() {
        return this.httpClient.get<any>("http://localhost:2020/api/equipment/getAll")
    }

    update(id: number, serialNumber: string, profile: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/equipment/update", {
            id,
            serialNumber,
            profile: {id: profile}
        })
    }

    delete(id: number) {
        return this.httpClient.post<any>("http://localhost:2020/api/equipment/delete", {id})
    }
}
