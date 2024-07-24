import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';

const baseUrl = environments.base_url
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //para variar no usaremos http sino fetch
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${baseUrl}/upload/${tipo}/${id}`

      //creamos la data que vamos a enviar con el fetch
      const formData = new FormData()
      formData.append('imagen', archivo)

      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') ?? ''
        },
        body: formData
      })
      const data = await resp.json()

      if(data.ok){
        return data.fileName
      }else{
        return false
      }
    } catch (error) {
      return false;
    }
  }
}
