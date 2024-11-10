import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Contract {
  id: number
  number: string
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(number: number, address: string) {
    return this.httpClient.post<Contract>(this.globalService.API_URL + "/api/contract/create", {number, address})
  }

  update(id: number, number: number, address: string) {
    return this.httpClient.post<Contract>(this.globalService.API_URL + "/api/contract/update", {id, number, address});
  }

  delete(id: number) {
    return this.httpClient.post<Contract>(this.globalService.API_URL + "/api/contract/delete", {id});
  }

  restore(id: number) {
    return this.httpClient.post<Contract>(this.globalService.API_URL + "/api/contract/restore", {id});
  }

  getAll(deleted: boolean) {
    return this.httpClient.post<Contract[]>(this.globalService.API_URL + "/api/contract/getAll", deleted);
  }

  getById(id: number) {
    return this.httpClient.post<Contract>(this.globalService.API_URL + "/api/contract/getById", {id});
  }
}
