import {Component, OnInit} from '@angular/core';
import {School} from '../school';
import {SchoolService} from '../school.service';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './school-cards.component.html',
  styleUrls: ['./school-cards.component.scss']
})
export class SchoolCardsComponent implements OnInit {
  schools: School[] = [];

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools(): void {
    this.schoolService.getSchools()
      .subscribe(schools => this.schools = schools);
  }
}
