import { environments } from '../../environments/environment';
import { Hospital } from './hospital.model';

const baseUrl = environments.base_url;

interface MedicUser {
  nombre: string;
  _i?: string;
  img: string;
}
export class Medicos {
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: MedicUser,
    public hospital?: Hospital
  ) {}

}
