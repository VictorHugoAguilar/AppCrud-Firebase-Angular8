import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudheroesangular.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/Heroes.json`, heroe)
      .pipe(
        map(
          (resp: any) => {
            heroe.id = resp.name;
            return heroe;
          }
        )
      );
  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

    console.log(heroeTemp);

    console.log("  actualizarHeroe(heroe: HeroeModel", heroe);

    return this.http.put(`${this.url}/Heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/Heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/Heroes.json`)
      .pipe(
        map(resp => this.crearArray(resp)),
        delay(1000)
      );
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/Heroes/${id}.json`);
  }


  private crearArray(heroeObj: object) {

    const heroes: HeroeModel[] = [];

    if (heroeObj === null) {
      return [];
    }

    Object.keys(heroeObj).forEach(key => {

      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;

      heroes.push(heroe);

    });

    return heroes;

  }


}
