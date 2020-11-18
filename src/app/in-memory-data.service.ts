import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {School} from './school';
import {Location} from './location';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const schools: School[] = [
      {id: 1,
        title: 'Aegeri Dogs',
        description: 'sometimes it is gonna be a desc',
        location: 'zug',
        sortOfTraining: 'puppyClass',
        image: 'assets/images/first.jpg'},
      {id: 2,
        title: '2nd school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'agility',
        image: ''},
      {id: 3,
        title: '3d school',
        description: 'sometimes it is gonna be a desc',
        location: 'zug',
        sortOfTraining: 'SAR',
        image: ''},
      {id: 4,
        title: '4th chool',
        description: 'sometimes it is gonna be a desc',
        location: 'bern',
        sortOfTraining: 'IPO',
        image: ''},
      {id: 5,
        title: '5th school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'agility',
        image: ''},
      {id: 6,
        title: '6th school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'OBD',
        image: ''},
      {id: 7,
        title: '7th school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'BH exam',
        image: ''}
    ];
    const locations: Location[] = [
      {id: 1, name: 'Zug'},
      {id: 2, name: 'Zurich'},
      {id: 3, name: 'Bern'},
    ];
    return {schools, locations};
  }
}
