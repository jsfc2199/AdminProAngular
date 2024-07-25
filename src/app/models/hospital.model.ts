import { environments } from '../../environments/environment';

const baseUrl = environments.base_url;

interface HospitalUser {
  nombre: string;
  _i?: string;
  img: string;
}
export class Hospital {
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: HospitalUser
  ) {}

  //esto también serviría para el hospital pero para variar usaremos un pipe
  // get imagenUrl(): string{
  //   if(!this.img){
  //     return `${baseUrl}/upload/usuarios/no-image`
  //   }else if(this.img?.includes('https')){
  //     return this.img
  //   } else if(this.img){
  //     return `${baseUrl}/upload/usuarios/${this.img}`
  //   }
  //   return `${baseUrl}/upload/usuarios/no-image`
  // }
}
