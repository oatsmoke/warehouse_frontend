import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

export interface Category {
  id: number
  title: string
  deleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(title: string) {
    return this.httpClient.post<Category>(this.globalService.API_URL + "/api/category/create", {title})
  }

  update(id: number, title: string) {
    return this.httpClient.post<Category>(this.globalService.API_URL + "/api/category/update", {
      id,
      title
    });
  }

  delete(id: number) {
    return this.httpClient.post<Category>(this.globalService.API_URL + "/api/category/delete", {id});
  }

  restore(id: number) {
    return this.httpClient.post<Category>(this.globalService.API_URL + "/api/category/restore", {id});
  }

  getAll(deleted: boolean) {
    return this.httpClient.post<Category>(this.globalService.API_URL + "/api/category/getAll", deleted);
  }

  getById(id: number) {
    return this.httpClient.post<Category>(this.globalService.API_URL + "/api/category/getById", {id});
  }
}
