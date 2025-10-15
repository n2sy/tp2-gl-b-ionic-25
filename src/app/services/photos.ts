import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class Photos {
  async takePicture() {
   let capturedPhoto =  await Camera.getPhoto(
        {
            source : CameraSource.Camera,
            quality : 90,
            resultType : CameraResultType.DataUrl
        }
    );
    console.log(capturedPhoto.dataUrl);
    
  }
}
