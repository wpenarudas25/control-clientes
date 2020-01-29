import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
import { Cliente } from 'src/app/Modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente={
    nombre:'',
    apellido:'',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm", {static: false}) clienteForm : NgForm;

  @ViewChild("botonCerrar", {static: false}) botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio, 
    private falshMessages:FlashMessagesService) { }

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes != null){
      this.clientes.forEach(cliente=>{
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}:{value:Cliente, valid:boolean}){
    if(!valid){
      this.falshMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }else{
      //Agregar el nuevo  cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
