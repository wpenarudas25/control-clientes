import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  
  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor( private loginService: LoginService,
    private router:Router,
    private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn= false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe( configuracion =>{
      this.permitirRegistro = configuracion.permitirRegistro;
    });
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }

}
