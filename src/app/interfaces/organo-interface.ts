// Generated by https://quicktype.io

export interface ResultOrgano {
  ok:   boolean;
  msg:  string;
  resp: Resp[];
}

export interface Resp {
  id:      number;
  nombre:  string;
  estado:  number;
  id_sede: number;
  Sede:    Sede;
}

export interface Sede {
  id:     number;
  nombre: string;
  estado: number;
}
