import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROJECT } from '../models/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, tap } from 'rxjs/operators';

@Injectable()
export class DataService {
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public baseUrl: string = 'http://localhost:3000/data';
  public dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD methods goes down */
  getProjects(): Observable<any> {
    return this.httpClient.get(this.baseUrl)
      .pipe(tap((res) => console.log("get projects", res)),
        catchError(this.handleError<any>('getProjects')
        ));
  }

  addProject(project: PROJECT): void {
    this.dialogData = project;
  }

  addProjects(project: PROJECT): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, project, this.httpOptions)
      .pipe(
        tap((res) => console.log(`added project w/ id=${res.id}`)),
        catchError(this.handleError<any>('addProjects')
        ));
  }
  
  updateProjects(project: PROJECT): Observable<PROJECT> {
    const url = `${this.baseUrl}/${project.id}`;
    return this.httpClient.put<any>(url, project, this.httpOptions)
      .pipe(
        tap((res) => console.log(`updated project w/ id=${res.id}`)),
        catchError(this.handleError<any>('updateProjects')
        ));
  }

  updateProject(project: PROJECT): void {
    this.dialogData = project;
  }

  // Error handler 
  private handleError<T>(action = 'action', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${action} failed: ${error.message}`);
      return of(result as T);
    };
  }

}





