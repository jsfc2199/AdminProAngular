import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
const baseUrl = environments.base_url
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  

  private _ocultarModal: boolean = true;
  tipo: string = ''
  id: string = ''  
  img?: string = ''
  
  get ocultarModal(){
    return this._ocultarModal
  }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id: string, img: string = 'no-image'){
    this._ocultarModal = false
    this.tipo = tipo
    this.id = id;
    if(img?.includes('https')){
      this.img = img      
    }else{
      this.img =`${baseUrl}/upload/${tipo}/${img}`      
    }


  }
  
  cerrarModal(){
    this._ocultarModal = true
  }
}
