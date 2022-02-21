import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = []; 
  constructor(private http: HttpClient) {
    this.cargarProductos()
   }


   private cargarProductos(){
     return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-a594c-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve('');
      });

     });
    
   }

   getProducto( id: string){
    return this.http.get(`https://angular-html-a594c-default-rtdb.firebaseio.com/productos/${id}.json`);
     
   }

   buscarProducto( termino: string) {
      if( this.productos.length === 0 ) {
        //cargar producto
          this.cargarProductos().then( () => {

            this.filtrarProductos( termino );
            
          });
      }
      else
      {
          //aplicar filtro
          this.filtrarProductos( termino );
      }
   }

   private filtrarProductos( termino: string ) {
      this.productoFiltrado = [];
      termino = termino.toLocaleLowerCase();
      this.productos.forEach( produt => {

        const tituloLower = produt.titulo.toLocaleLowerCase();
          if( produt.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
            this.productoFiltrado.push( produt );
          }
      });
   }
}
