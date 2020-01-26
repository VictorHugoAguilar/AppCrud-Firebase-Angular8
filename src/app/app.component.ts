import { Component } from '@angular/core';
// para hacer uso de fortawesome importamos la siguiente libreria luego exportamos el icono
// y llamamos desde el html a icono que sacamos desde el export class
// <fa-icon [icon]="faCoffee"></fa-icon> por ejemplo
// import { } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'heroesApp';
}
