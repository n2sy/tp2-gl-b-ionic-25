import { Component } from '@angular/core';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
c = new Course() 

constructor() {}
}
