import { Component, inject } from '@angular/core';
import { Course } from '../models/course.model';
import { GestionCours } from '../services/gestion-cours';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
    tabCourses : Course[] = [];
    private courseService = inject(GestionCours)
  constructor() {}
  
  ngOnInit() {
   this.tabCourses = this.courseService.getAllCourses();
  }
}
