import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoryService} from "../service/category.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryResolver implements Resolve<any> {
    constructor(private categoryService: CategoryService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.categoryService.getAll(true)
    }
}
