
export interface Menu {
  titulo:  string;
  icono:   string;
  submenu: Submenu[];
}

export interface Submenu {
  titulo: string;
  url:    string;
}
