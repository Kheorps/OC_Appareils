import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppareilService implements OnInit {

  appareilsSubject = new Subject<any[]>();
  private appareils: any[];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getAppareilsFromServer();
  }

  /**
   * ============================== GETTERS/SETTERS ==============================
   */

  /**
   * Renvoi tous les appareils du service dès initialisation et MàJ
   */
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  /**
   * Renvoi les informations d'un appareil selon son id
   * @param id Identifiant de l'appareil
   */
  getAppareilById(id) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }

  /**
   * Ajout d'un nouvel appareil
   * @param name Nom de l'appareil
   * @param status Statut de l'appareil
   */
  addAppareil(name: string, status: string) {
    // Initialisation nouvel objet Appareil
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };

    // Alimentation des champs
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    // Ajout du nouvel appareil
    this.appareils.push(appareilObject);
    this.saveAppareilsToServer();

    // Mise à jour et envoi de la novuelle donnée
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient
      .put('https://openclassroom-tuto-6fca8.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur : ' + error.message);
        },
        () => { }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://openclassroom-tuto-6fca8.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur : ' + error.message);
        },
        () => { }
      );
  }

  /**
   * ============================== METHODS ==============================
   */

  /**
   * Allume un appareil selon son id
   * @param i Identifiant de l'appareil
   */
  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
  }

  /**
   * Éteint un appareil selon son id
   * @param i Identifiant de l'appareil
   */
  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
  }

  /**
   * Allume tous les appareils
   */
  switchOnAll() {
    this.appareils.forEach(appareil => {
      appareil.status = 'allumé';
    });
  }

  /**
   * Éteint tous les appareils
   */
  switchOffAll() {
    this.appareils.forEach(appareil => {
      appareil.status = 'éteint';
    });
  }
}
