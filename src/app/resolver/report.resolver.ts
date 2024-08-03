import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportResolver implements Resolve<boolean> {
  resolve(): Observable<boolean> {
    return of(true);
  }
}
