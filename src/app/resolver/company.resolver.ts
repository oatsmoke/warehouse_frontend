import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Company, CompanyService} from "../service/company.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyResolver implements Resolve<Company[]> {
  constructor(private companyService: CompanyService) {
  }

  resolve(): Observable<Company[]> {
    return this.companyService.getAll(true)
  }
}
