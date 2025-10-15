import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Photos } from '../services/photos';
import { GestionCours } from '../services/gestion-cours';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
  standalone: false,
})
export class AddCoursePage implements OnInit {
  private toastCtrl = inject(ToastController);
  private photoSer = inject(Photos);
  private gestionCours = inject(GestionCours);
  private actionSheetCtrl = inject(ActionSheetController);
  private router = inject(Router);
  temporaryPhotos = [];
  addForm = new FormGroup({
    title: new FormControl('title par défaut', Validators.required),
    author: new FormControl(null, Validators.required),
    logo: new FormControl(''),
    keywords: new FormControl([]),
  });
  inputKeywords = '';

  addKeyword() {
    if (this.addForm.get('keywords').value.indexOf(this.inputKeywords) == -1) {
      this.addForm.get('keywords').value.push(this.inputKeywords);
    } else {
      this.presentToast('Mot-clé existant', 'warning');
    }

    this.inputKeywords = '';
  }

  deleteKeyword(keywordToDelete) {
    let i = this.addForm.get('keywords').value.indexOf(keywordToDelete);
    this.addForm.get('keywords').value.splice(i);
  }

  async presentToast(msg, color) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: color,
    });

    await toast.present();
  }

  submitHandler() {
    this.gestionCours.addCourse({
      ...this.addForm.value,
      images: [...this.temporaryPhotos],
    });
    this.temporaryPhotos = [];
    this.presentToast('Cours ajouté avec succès', 'success');
    this.router.navigateByUrl('/home');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler: () => {
            this.photoSer.takePicture();
          },
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'image',
          handler: async () => {
            let result = await this.photoSer.selectionnerPhotos();
            let tab = result.photos.map((photo) => {
              return photo.webPath;
            });
            this.temporaryPhotos = [...tab];
          },
        },
      ],
    });

    await actionSheet.present();
  }
  constructor() {}

  ngOnInit() {}
}
