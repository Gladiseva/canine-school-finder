import {Injectable} from '@angular/core';
import {School} from './school';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schoolsUrl = 'api/schools';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.schoolsUrl)
      .pipe(
        tap(_ => this.log('fetched schools')),
        catchError(this.handleError<School[]>('getSchools', []))
      );
  }

  searchSchools(location: string): Observable<School[]> {
    if (!location.trim()) {
      return of([]);
    }
    return this.http.get<School[]>(`${this.schoolsUrl}/?location=${location}`).pipe(
      tap(x => x.length ?
        this.log(`found schools matching "${location}"`) :
        this.log(`no schools matching "${location}"`)),
      catchError(this.handleError<School[]>('searchSchools', []))
    );
  }

  private log(message: string): void {
    this.messageService.add(`SchoolService: ${message}`);
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
