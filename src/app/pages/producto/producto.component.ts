import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: ProductoDescripcion = {};
  id: string = '';
  constructor(private route: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params
    .subscribe(parametros => {
      this.productoService.getProducto(parametros['id'])
      .subscribe( (producto: ProductoDescripcion)   => {
       
         this.producto = producto;
         this.id = parametros['id'];
      });
    });
  }

}
