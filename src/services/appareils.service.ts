import { Appareils } from "../models/Appareils";
import { Subject } from "rxjs/Subject";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

export class AppareilsService {

    appareils$ = new Subject<Appareils[]>();

    appareilsList: Appareils[] = [
        {
            name: 'Machine à laver',
            description: [
                'Volume: 6 litres',
                'Temps de lavage: 2 heures',
                'Consommation: 173kWh/an'
            ],
            isOn: true,
            startTime:'',
            endTime:''
        },
        {
            name: 'Télévision',
            description: [
                'Dimension: 40 pouces',
                'Consommation: 22kWh/an'
            ],
            isOn: true,
            startTime:'',
            endTime:''
        },
        {
            name: 'Ordinateur',
            description: [
                'Marque: MSI',
                'Consommation: 500kWh/an'
            ],
            isOn: false,
            startTime:'',
            endTime:''
        }
    ];

    addAppareil(appareil: Appareils) {
        this.appareilsList.push(appareil);
        this.emitAppareils();
    }

    emitAppareils() {
        this.appareils$.next(this.appareilsList.slice());
    }

    saveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('appareils').set(this.appareilsList).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
    }
    
    retrieveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('appareils').once('value').then(
            (data: DataSnapshot) => {
              this.appareilsList = data.val();
              this.emitAppareils();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
    }
}