import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Appareils } from '../../../models/Appareils';
import { AppareilsService } from '../../../services/appareils.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'page-single-appareils',
  templateUrl: 'single-appareils.html',
})
export class SingleAppareilsPage implements OnInit {

  appareil: Appareils;
  index: number;

  constructor(public navParams: NavParams,
    private viewCtrl: ViewController,
    private appareilsService: AppareilsService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.appareil = this.appareilsService.appareilsList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleAppareils() {
    this.appareil.isOn = !this.appareil.isOn;
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    this.dismissModal();
  }

  onDeleteHours() {
    this.appareil.startTime = '';
    this.appareil.endTime = '';
    this.dismissModal();
  }
}
