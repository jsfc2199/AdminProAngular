import { environments } from "../../environments/environment"

const baseUrl = environments.base_url

export class User {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public uuid?: string
  ) {}

  get imagenUrl(): string{
    if(!this.img){
      return `${baseUrl}/upload/usuarios/no-image`
    }else if(this.img?.includes('https')){
      return this.img
    } else if(this.img){
      return `${baseUrl}/upload/usuarios/${this.img}`
    }
    return `${baseUrl}/upload/usuarios/no-image`
  }
}
