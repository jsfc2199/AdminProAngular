import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../environments/environment';
const baseUrl = environments.base_url
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipos: 'usuarios'| 'medicos' | 'hospitales'): string {
    if(!img){
      return `${baseUrl}/upload/${tipos}/no-image`
    }else if(img?.includes('https')){
      return img
    } else if(img){
      return `${baseUrl}/upload/${tipos}/${img}`
    }
    return `${baseUrl}/upload/${tipos}/no-image`
  }

}
