import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Photos } from '../services/photos';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
  standalone: false,
})
export class AddCoursePage implements OnInit {
    private toastCtrl = inject(ToastController);
    private photoSer = inject(Photos);
    private actionSheetCtrl = inject(ActionSheetController);
    addForm = new FormGroup(
        {
            title : new FormControl('title par défaut', Validators.required),
            author : new FormControl(null, Validators.required),
            logo : new FormControl(''),
            keywords : new FormControl([])
        }
    );
    inputKeywords = '';
    
    addKeyword() {
        if(this.addForm.get("keywords").value.indexOf(this.inputKeywords) == -1 ) {
            this.addForm.get("keywords").value.push(this.inputKeywords);
            
        }
        else {
            this.presentToast();
        }
        
           this.inputKeywords = '';
           

    }
    
    deleteKeyword(keywordToDelete) {
        let i =  this.addForm.get("keywords").value.indexOf(keywordToDelete);
         this.addForm.get("keywords").value.splice(i)
        
    }
    
     async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Mot-clé existant',
      duration: 1500,
      position: 'bottom',
      color : "warning"
    });

    await toast.present();
  }
  
    submitHandler() {
        console.log(this.addForm.value);
        
    }
    
     async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler : () => {
            this.photoSer.takePicture();
          }
         
        },
        {
          text: 'Choisir depuis la galerie',
          icon : 'image'
         
        }
      ],
    });

    await actionSheet.present();
  }
  constructor() {}

  ngOnInit() {}
}
