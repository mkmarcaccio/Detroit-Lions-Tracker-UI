import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SeasonGames } from 'src/app/shared/models/season-games';
import { SeasonStats } from 'src/app/shared/models/season-stats';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetroitLionsTrackerService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  constructor(private http: HttpClient) { }


  public getGames(): Observable<SeasonGames[]> {
    return this.http
      .get<SeasonGames[]>(`${environment.BaseAddress}Games`, { headers: this.headers });
  }


  public updateGames(gameId: number, seasonGames: SeasonGames): Observable<SeasonGames> {
    return this.http
        .put<SeasonGames>(`${environment.BaseAddress}Game/${gameId}`, 
        JSON.stringify(seasonGames), 
        { headers: this.headers });
  }


  public createGames(seasonGames: SeasonGames): Observable<SeasonGames> {

    return this.http
        .post<SeasonGames>(`${environment.BaseAddress}Game`, 
        JSON.stringify(seasonGames), 
        { headers: this.headers });
  }


  public deleteGames(gameId: number): Observable<SeasonGames> {

    return this.http
        .delete<SeasonGames>(`${environment.BaseAddress}Game/${gameId}`, 
        { headers: this.headers });
  }


  public getSeasons(): Observable<SeasonStats[]> {
    return this.http
      .get<SeasonStats[]>(`${environment.BaseAddress}Seasons`, { headers: this.headers });
  }


  public updateSeasons(seasonId: number, seasonStats: SeasonStats): Observable<SeasonStats> {
    return this.http
        .put<SeasonStats>(`${environment.BaseAddress}Season/${seasonId}`, 
        JSON.stringify(seasonStats), 
        { headers: this.headers });
  }


  public createSeasons(seasonStats: SeasonStats): Observable<SeasonStats> {

    return this.http
        .post<SeasonStats>(`${environment.BaseAddress}Season`, 
        JSON.stringify(seasonStats), 
        { headers: this.headers });
  }


  public deleteSeasons(seasonId: number): Observable<SeasonStats> {

    return this.http
        .delete<SeasonStats>(`${environment.BaseAddress}Season/${seasonId}`, 
        { headers: this.headers });
  }
}
