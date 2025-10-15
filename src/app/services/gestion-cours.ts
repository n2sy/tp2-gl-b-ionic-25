import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class GestionCours {
  private allCourses: Course[] = [
    {
      id: 1,
      title: 'Angular',
      author: 'Chaima Ouerghi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Angular_gradient.png/1200px-Angular_gradient.png',
      keywords: ['component', 'binding', 'directive'],
    },
    {
      id: 2,
      title: 'Ionic',
      author: 'Nidhal Jelassi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/LogoIonic.png',
      keywords: ['hybrid', 'mobile', 'UI'],
    },
    {
      id: 3,
      title: 'Android',
      author: 'Mohamed Belhadj',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvmIAnvnN_rA11aC0bbHS_yNog_QKAA2LCQ&s',
      keywords: ['mobile', 'activity', 'layout'],
    },
  ];

  addCourse(newCourse) {
    newCourse.id = crypto.randomUUID();
    this.allCourses.push(newCourse);
  }

  getCourseById(selectedId) {
    return this.allCourses.find((element) => element.id == selectedId);
  }

  deleteCourse(selectedId) {
    let i = this.allCourses.findIndex((element) => element.id == selectedId);
    this.allCourses.splice(i, 1);
  }

  getAllCourses() {
    return this.allCourses;
  }
}
