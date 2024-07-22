import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Category, CategoryService} from "../service/category.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<any> {
  constructor(private categoryService: CategoryService) {
  }

  resolve(): Observable<Category[]> {
    return this.categoryService.getAll(true)
  }
}
