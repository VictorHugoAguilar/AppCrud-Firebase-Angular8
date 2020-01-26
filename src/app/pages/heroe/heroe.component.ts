import { Component, OnInit } from '@angular/core';

import { faArrowLeft, faDizzy, faSmileWink, faSave } from '@fortawesome/free-solid-svg-icons';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faDizzy = faDizzy;
  faSmileWink = faSmileWink;
  faSave = faSave;

  heroe: HeroeModel = new HeroeModel();


  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      console.log("El heroeo existe es difetrente de nuevo");
      console.log("El id es: " , id)
      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }

  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.error('Comprueba los datos del formulario');
      return;
    }
    // console.log(form);
    // console.log(this.heroe);

    Swal.fire({
      title: 'Espere...',
      text: 'Guardando información',
      allowOutsideClick: false,
      timer: 2000
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    console.log('guardar(form: NgForm)', this.heroe.id);


    if (this.heroe.id) {
      console.log('heroe-component... Actualizando...');
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      console.log('heroe-component... Creando heroe');
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe((resp: HeroeModel) => {
      // console.log(resp);
      Swal.fire(`Heroe: ${resp.nombre}`,
        `Ha sido actualizado correctamente.`,
        'success');
    });
  }


}
