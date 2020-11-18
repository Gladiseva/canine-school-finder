import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {School} from '../interfaces/school';
import {Location} from '../interfaces/location';
import {SchoolType} from '../interfaces/school-type';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const schools: School[] = [
      {
        id: 1,
        title: 'Aegeri Dogs',
        description: 'sometimes it is gonna be a desc',
        location: 'zug',
        sortOfTraining: 'puppyClass',
        image: 'assets/images/first.jpg',
        price: 25
      },
      {
        id: 2,
        title: '2nd school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'agility',
        image: '',
        price: 25
      },
      {
        id: 3,
        title: '3d school',
        description: 'sometimes it is gonna be a desc',
        location: 'zug',
        sortOfTraining: 'SAR',
        image: '',
        price: 25
      },
      {
        id: 4,
        title: '4th chool',
        description: 'sometimes it is gonna be a desc',
        location: 'bern',
        sortOfTraining: 'IPO',
        image: '',
        price: 25
      },
      {
        id: 5,
        title: '5th school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'agility',
        image: '',
        price: 25
      },
      {
        id: 6,
        title: '6th school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'OBD',
        image: '',
        price: 25
      },
      {
        id: 7,
        title: '7th school',
        description: 'sometimes it is gonna be a desc',
        location: 'zurich',
        sortOfTraining: 'BH exam',
        image: '',
        price: 25
      }
    ];
    const locations: Location[] = [
      {id: 1, name: 'Zug'},
      {id: 2, name: 'Zurich'},
      {id: 3, name: 'Bern'},
    ];
    const schoolTypes: SchoolType[] = [
      {id: 1, name: 'All', state: true},
      {id: 2, name: 'Puppy classes', state: false},
      {id: 3, name: 'Behaviour consultation', state: false},
      {id: 4, name: 'Agility', state: false},
      {id: 5, name: 'IPO', state: false},
      {id: 6, name: 'OBD', state: false},
      {id: 7, name: 'SAR', state: false},
      {id: 8, name: 'BH', state: false},
    ];
    return {schools, locations, schoolTypes};
  }
}
