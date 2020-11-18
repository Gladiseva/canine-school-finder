import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SchoolType} from '../interfaces/school-type';

@Injectable({
  providedIn: 'root'
})
export class SchoolTypeService {
  private schoolTypeUrl = 'api/schoolTypes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getSchoolTypes(): Observable<SchoolType []> {
    return this.http.get<SchoolType[]>(this.schoolTypeUrl)
      .pipe(
        tap(_ => this.log('fetched school types')),
        catchError(this.handleError<SchoolType[]>('getSchoolTypes', []))
      );
  }

  private log(message: string): void {
    this.messageService.add(`SchoolTypeService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
