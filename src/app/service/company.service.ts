import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Company {
  id: number
  title: string
  deleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(title: string) {
    return this.httpClient.post<Company>(this.globalService.API_URL + "/api/company/create", {title})
  }

  update(id: number, title: string) {
    return this.httpClient.post<Company>(this.globalService.API_URL + "/api/company/update", {
      id,
      title
    });
  }

  delete(id: number) {
    return this.httpClient.post<Company>(this.globalService.API_URL + "/api/company/delete", {id});
  }

  restore(id: number) {
    return this.httpClient.post<Company>(this.globalService.API_URL + "/api/company/restore", {id});
  }

  getAll(deleted: boolean) {
    return this.httpClient.post<Company[]>(this.globalService.API_URL + "/api/company/getAll", deleted);
  }

  getById(id: number) {
    return this.httpClient.post<Company>(this.globalService.API_URL + "/api/company/getById", {id});
  }
}
