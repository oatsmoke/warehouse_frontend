import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Department {
  id: number
  title: string
  deleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(title: string) {
    return this.httpClient.post<Department>(this.globalService.API_URL + "/api/department/create", {title})
  }

  update(id: number, title: string) {
    return this.httpClient.post<Department>(this.globalService.API_URL + "/api/department/update", {id, title});
  }

  delete(id: number) {
    return this.httpClient.post<Department>(this.globalService.API_URL + "/api/department/delete", {id});
  }

  restore(id: number) {
    return this.httpClient.post<Department>(this.globalService.API_URL + "/api/department/restore", {id});
  }

  getAll(deleted: boolean) {
    return this.httpClient.post<Department[]>(this.globalService.API_URL + "/api/department/getAll", deleted);
  }

  getById(id: number) {
    return this.httpClient.post<Department>(this.globalService.API_URL + "/api/department/getById", {id});
  }

  getAllButOne(id: number) {
    return this.httpClient.post<Department[]>(this.globalService.API_URL + "/api/department/getAllButOne", {id});
  }
}
