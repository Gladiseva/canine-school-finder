import {Injectable} from '@angular/core';
import {School} from '../interfaces/school';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {SchoolType} from '../interfaces/school-type';

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

  searchSchools(location: string, selectedSchoolType: SchoolType): Observable<School[]> {
    if (!location.trim()) {
      return of([]);
    }
    return this.http.get<School[]>(`${this.schoolsUrl}/?location=${location}`).pipe(
      catchError(this.handleError<School[]>('searchSchools', [])),
      map(schools => schools
        .filter(school => selectedSchoolType.name === 'All' ? true : school.sortOfTraining.includes(selectedSchoolType.name))
      ),
      tap(x => x.length ?
        this.log(`found schools matching "${location}" and ` + selectedSchoolType.name) :
        this.log(`no schools matching "${location}" and ` + selectedSchoolType.name)),
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
