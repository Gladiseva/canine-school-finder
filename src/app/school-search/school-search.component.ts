import {Component, OnDestroy, OnInit} from '@angular/core';
import {School} from '../school';
import {SchoolService} from '../school.service';
import {FormControl} from '@angular/forms';

import {Observable, Subject, Subscription} from 'rxjs';

import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'csf-school-search',
  templateUrl: './school-search.component.html',
  styleUrls: ['./school-search.component.scss']
})
export class SchoolSearchComponent implements OnInit, OnDestroy {
  filteredSchools$: Observable<School[]>;
  private searchTerms = new Subject<string>();

  control = new FormControl();
  locations: string[] = [];
  filteredLocations: Observable<string[]>;
  private subscription = new Subscription();

  constructor(private schoolService: SchoolService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    const subscription = this.schoolService.getSchools().subscribe(schools => {
      this.locations = _.uniq(schools.map(school => school.location));
    });
    this.subscription.add(subscription);

    this.filteredLocations = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredSchools$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.schoolService.searchSchools(term)),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.locations.filter(location => this._normalizeValue(location).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
