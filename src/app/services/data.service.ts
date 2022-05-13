import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Data } from '../model/data';
import { URL } from '../config/api';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  deleteRecord(Name: string) {
    throw new Error('Method not implemented.');
  }


  constructor(private http: HttpClient,private msg: MessageService) { }
  
 

  private log(message: string) {
    this.msg.add(`Product service: ${message}`);
  }

  getData(): Observable<Data[]>{

    return this.http.get<Data[]>(URL).pipe(
      tap(_=> this.log('Preuzeti podaci')),
      catchError(this.handleError<Data[]>('getKonobari',[]))
      );
  }
/*
  getRadnike(): Observable<Konobar[]> {
    return this.http.get<Konobar[]>(getKonobari).pipe(
      tap(_=> this.log('Preuzeti radnici')),
      catchError(this.handleError<Konobar[]>('getKonobari',[]))
    );
  }
  createRadnik(konobar:Konobar):Observable<Konobar> {
    return this.http.post<Konobar>(newKonobar,JSON.stringify(konobar)).pipe(
      tap(_=> alert('Radnik dodat!')),
        catchError(this.handleError))
  }
  
  updateRadnik(konobar:Konobar){
    return this.http.post<Konobar>(updateKonobar,JSON.stringify(konobar)).pipe(
      tap(_=> alert('Radnik izmenjen!')),
        catchError(this.handleErrorTwo))
  }
  
  deleteRadnik(id:number) {
    return this.http.get<Konobar>(`${deleteKonobar}?id=${id}`).pipe(
      tap(_=> alert('Radnik izbrisan!')),
        catchError(this.handleErrorTwo))
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

  handleErrorTwo(error: HttpErrorResponse) {
    console.log("Error! Something went wrong.",error);
    alert(JSON.stringify(error.error))
    return throwError("Something went wrong");
   }
}
