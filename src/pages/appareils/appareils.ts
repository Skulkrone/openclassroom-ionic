import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ModalController, MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { SingleAppareilsPage } from './single-appareils/single-appareils';
import { Appareils } from '../../models/Appareils';
import { AppareilsService } from '../../services/appareils.service';
import { AppareilFormPage } from '../appareil-form/appareil-form';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'page-appareils',
    templateUrl: 'appareils.html'
})
export class AppareilsPage implements OnInit, OnDestroy {

    appareilsList: Appareils[];
    appareilsSubscription: Subscription;

    constructor(private modalCtrl: ModalController,
        private appareilsService: AppareilsService,
        private menuCtrl: MenuController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController) {
    }

    ngOnInit() {
        this.appareilsSubscription = this.appareilsService.appareils$.subscribe(
            (appareils: Appareils[]) => {
                this.appareilsList = appareils;
            }
        );
        this.appareilsService.emitAppareils();
    }

    onLoadAppareil(index: number) {
        let modal = this.modalCtrl.create(SingleAppareilsPage, {index: index});
        modal.present();
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }

    onNewAppareil() {
        this.navCtrl.push(AppareilFormPage);
    }

    onSaveList() {
        let loader = this.loadingCtrl.create({
            content : 'Sauvegarde en cours...'
        });
        loader.present();
        this.appareilsService.saveData().then(
            () => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: 'Données Sauvegardées !',
                    duration: 3000,
                    position: 'bottom'
                }).present();
            }
        ).catch(
            (error) => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'bottom'
                }).present();
            }
        );
    }

    onFetchList() {
        let loader = this.loadingCtrl.create({
            content : 'Récupération en cours...'
        });
        loader.present();
        this.appareilsService.retrieveData().then(
            () => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: 'Données récupérées !',
                    duration: 3000,
                    position: 'bottom'
                }).present();
            }
        ).catch(
            (error) => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'bottom'
                }).present();
            }
        );
    }

    ngOnDestroy() {
        this.appareilsSubscription.unsubscribe();
    }
}