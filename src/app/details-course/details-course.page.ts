import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionCours } from '../services/gestion-cours';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.page.html',
  styleUrls: ['./details-course.page.scss'],
  standalone: false,
})
export class DetailsCoursePage implements OnInit {
    selectedCourse : Course;
  private activatedRoute = inject(ActivatedRoute);
  private alertCtrl = inject(AlertController);
  private courseService= inject(GestionCours)
  private router= inject(Router)
  constructor() {}

  ngOnInit() {
   this.selectedCourse= this.courseService.getCourseById(this.activatedRoute.snapshot.paramMap.get('id'));
   console.log(this.selectedCourse);
   

  }
  
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ce cours ?',
      buttons: ['Non', 
        {
            text : 'Oui',
            handler : () => {
                this.courseService.deleteCourse(this.selectedCourse.id);
                this.router.navigateByUrl("/home")
            }
        }
      ],
    });

    await alert.present();
  }
}
