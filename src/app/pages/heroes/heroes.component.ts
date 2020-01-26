import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import { faPlus, faSync, faExclamation, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  faPlus = faPlus;
  faSync = faSync;
  faExclamation = faExclamation;
  faPen = faPen;
  faTrash = faTrash;

  heroes: HeroeModel[] = [];
  cargando: boolean = false;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesServices.getHeroes().subscribe(resp => {
      console.log(resp);
      this.heroes = resp;

      // cuando ha cargado
      this.cargando = false;
    });
  }

  obtenerHeroes() {
  }

  borrarHeroe(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: 'Estás seguro',
      text: `Realmente estas seguro de eliminar a ${heroe.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        // console.log('array', i);
        // borramos del arreglo
        this.heroes.splice(i, 1);

        this.heroesServices.borrarHeroe(heroe.id)
          .subscribe();

        Swal.fire(
          'Eliminado!',
          'Tu heroe ha sido eliminado',
          'success'
        );
      }
    });
  }


}
