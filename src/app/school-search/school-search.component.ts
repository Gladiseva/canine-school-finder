import {Component, OnDestroy, OnInit} from '@angular/core';
import {School} from '../interfaces/school';
import {SchoolService} from '../services/school.service';
import {LocationService} from '../services/location.service';
import {FormControl} from '@angular/forms';

import {Observable, Subject, Subscription} from 'rxjs';

import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {Location} from '../interfaces/location';
import {SchoolType} from '../interfaces/school-type';
import {SchoolTypeService} from '../services/school-type.service';

@Component({
  selector: 'csf-school-search',
  templateUrl: './school-search.component.html',
  styleUrls: ['./school-search.component.scss']
})
export class SchoolSearchComponent implements OnInit, OnDestroy {
  filteredSchools$: Observable<School[]>;
  term: string;

  control = new FormControl();
  locations: Location[] = [];
  schoolTypes: SchoolType[] = [];
  selectedSchoolType: SchoolType = {
    id: 1, name: 'All', state: true
  };
  filteredLocations: Observable<string[]>;
  private subscription = new Subscription();

  constructor(
    private schoolService: SchoolService,
    private locationService: LocationService,
    private schoolTypeService: SchoolTypeService,
  ) {
  }

  search(): void {
    this.filteredSchools$ = this.schoolService.searchSchools(this.term, this.selectedSchoolType);
  }

  ngOnInit(): void {
    this.getLocations();
    this.getSchoolTypes();

    this.filteredLocations = this.control.valueChanges.pipe(
      startWith(''),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),
      map(value => this._filter(value))
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.locations.map(location => location.name).filter(location => this._normalizeValue(location).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getLocations(): void {
    this.locationService.getLocations()
      .subscribe(locations => this.locations = locations);
  }

  getSchoolTypes(): void {
    this.schoolTypeService.getSchoolTypes()
      .subscribe(types => this.schoolTypes = types);
  }

  searchSchoolBySchoolType(schoolType: SchoolType): void {
    this.schoolTypes.forEach(type => type.state = false);
    schoolType.state = !schoolType.state;
    this.selectedSchoolType = schoolType;
    this.search();
  }

  getSelectedSchoolType(): SchoolType {
    return this.selectedSchoolType;
  }
}
