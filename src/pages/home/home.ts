import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  plates: any = [];

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController) {
    this.getPlates();
  }

  // GET all plates
  getPlates() {
    this.http.get('/api/img').subscribe(response => {
      console.log(response);
      this.plates = response;
    });
  }

  // DELETE plate
  deletePlate(plate) {
    for (let i = 0; i < this.plates.length; i++) {
      if (this.plates[i][0] == plate) {
        this.plates.splice(i, 1);
        break;
      }
    }
    this.http.get(`/api/del/${plate}`).subscribe(response => {
      console.log(response);
      this.getPlates();
    });
  }

  // Input to create new plate
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'New Plate',
      inputs: [
        {
          name: 'plate',
          placeholder: 'GLST13'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.createPlate(data.plate);
          }
        }
      ]
    });
    alert.present();
  }

  // CREATE plate
  createPlate(plate) {
    this.http.get(`/api/new/${plate}`).subscribe(response => {
      console.log(response);
      this.getPlates();
    });
  }



}
