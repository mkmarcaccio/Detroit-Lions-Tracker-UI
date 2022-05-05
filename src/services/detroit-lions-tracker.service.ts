import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SeasonStats } from 'src/app/shared/models/season-stats';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetroitLionsTrackerService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  constructor(private http: HttpClient) { }


  public getSeasonStats(): Observable<SeasonStats[]> {
    return this.http
      .get<SeasonStats[]>(`${environment.BaseAddress}Games`, { headers: this.headers });
  }
}
