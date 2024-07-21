import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "./category.service";
import {GlobalService} from "./global.service";

export interface Profile {
  id: number
  title: string
  category: Category
  deleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient,
              private globalService: GlobalService) {
  }

  create(title: string, category: number) {
    return this.httpClient.post<Profile>(this.globalService.API_URL + "/api/profile/create", {
      title,
      category: {id: category}
    })
  }

  update(id: number, title: string, category: number) {
    return this.httpClient.post<Profile>(this.globalService.API_URL + "/api/profile/update", {
      id,
      title,
      category: {id: category}
    });
  }

  delete(id: number) {
    return this.httpClient.post<Profile>(this.globalService.API_URL + "/api/profile/delete", {id});
  }

  restore(id: number) {
    return this.httpClient.post<Profile>(this.globalService.API_URL + "/api/profile/restore", {id});
  }

  getAll(deleted: boolean) {
    return this.httpClient.post<Profile>(this.globalService.API_URL + "/api/profile/getAll", deleted);
  }

  getById(id: number) {
    return this.httpClient.post<Profile>(this.globalService.API_URL + "/api/profile/getById", {id});
  }
}
