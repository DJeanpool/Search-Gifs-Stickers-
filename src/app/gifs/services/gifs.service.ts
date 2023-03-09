import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gif, GifsInterfaces } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'apBO2yY5SRjAYy4Wf4UbgTYuRDH4MQ7k';
  private _historial: string[] = [];

  //no tiene que ser tipo any
  public resultados: Gif[] = [];

  constructor( private http:HttpClient ) {}

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<GifsInterfaces>(`https://api.giphy.com/v1/gifs/search?api_key=apBO2yY5SRjAYy4Wf4UbgTYuRDH4MQ7k&q=${ query }&limit=10`)
    .subscribe( ( resp) => {
      console.log( resp.data );
      this.resultados = resp.data
    })



  }

}
