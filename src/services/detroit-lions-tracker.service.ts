import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DefensiveGameStats } from 'src/app/models/defensive-game-stats';
import { OffensiveGameStats } from 'src/app/models/offensive-game-stats';
import { Player } from 'src/app/models/player';
import { SeasonGames } from 'src/app/models/season-games';
import { SeasonStats } from 'src/app/models/season-stats';
import { SpecialTeamsGameStats } from 'src/app/models/special-teams-game-stats';
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

  public getOffensiveGameStats(): Observable<OffensiveGameStats[]> {
    return this.http
      .get<OffensiveGameStats[]>(`${environment.BaseAddress}OffensiveGameStats`, { headers: this.headers });
  }

  public getOffensiveGameStatsByGameId(gameId: number): Observable<OffensiveGameStats[]> {
    return this.http
      .get<OffensiveGameStats[]>(`${environment.BaseAddress}OffensiveGameStats?GameId=${gameId}`, { headers: this.headers });
  }

  public updateOffensiveGameStats(gameId: number, playerId: number, offensiveGameStats: OffensiveGameStats): Observable<OffensiveGameStats> {
    return this.http
      .put<OffensiveGameStats>(`${environment.BaseAddress}OffensiveGameStats/${gameId}/${playerId}`,
        JSON.stringify(offensiveGameStats),
        { headers: this.headers });
  }

  public createOffensiveGameStats(offensiveGameStats: OffensiveGameStats): Observable<OffensiveGameStats> {
    return this.http
      .post<OffensiveGameStats>(`${environment.BaseAddress}OffensiveGameStats`,
        JSON.stringify(offensiveGameStats),
        { headers: this.headers });
  }

  public deleteOffensiveGameStats(gameId: number, playerId: number): Observable<OffensiveGameStats> {
    return this.http
      .delete<OffensiveGameStats>(`${environment.BaseAddress}OffensiveGameStats/${gameId}/${playerId}`,
        { headers: this.headers });
  }

  public getDefensiveGameStats(): Observable<DefensiveGameStats[]> {
    return this.http
      .get<DefensiveGameStats[]>(`${environment.BaseAddress}DefensiveGameStats`, { headers: this.headers });
  }

  public getDefensiveGameStatsByGameId(gameId: number): Observable<DefensiveGameStats[]> {
    return this.http
      .get<DefensiveGameStats[]>(`${environment.BaseAddress}DefensiveGameStats?GameId=${gameId}`, { headers: this.headers });
  }

  public updateDefensiveGameStats(gameId: number, playerId: number, defensiveGameStats: DefensiveGameStats): Observable<DefensiveGameStats> {
    return this.http
      .put<DefensiveGameStats>(`${environment.BaseAddress}DefensiveGameStats/${gameId}/${playerId}`,
        JSON.stringify(defensiveGameStats),
        { headers: this.headers });
  }

  public createDefensiveGameStats(defensiveGameStats: DefensiveGameStats): Observable<DefensiveGameStats> {
    return this.http
      .post<DefensiveGameStats>(`${environment.BaseAddress}DefensiveGameStats`,
        JSON.stringify(defensiveGameStats),
        { headers: this.headers });
  }

  public deleteDefensiveGameStats(gameId: number, playerId: number): Observable<DefensiveGameStats> {
    return this.http
      .delete<DefensiveGameStats>(`${environment.BaseAddress}DefensiveGameStats/${gameId}/${playerId}`,
        { headers: this.headers });
  }

  public getSpecialTeamsGameStats(): Observable<SpecialTeamsGameStats[]> {
    return this.http
      .get<SpecialTeamsGameStats[]>(`${environment.BaseAddress}SpecialTeamsGameStats`, { headers: this.headers });
  }

  public getSpecialTeamsGameStatsByGameId(gameId: number): Observable<SpecialTeamsGameStats[]> {
    return this.http
      .get<SpecialTeamsGameStats[]>(`${environment.BaseAddress}SpecialTeamsGameStats?GameId=${gameId}`, { headers: this.headers });
  }

  public updateSpecialTeamsGameStats(gameId: number, playerId: number, specialTeamsGameStats: SpecialTeamsGameStats): Observable<SpecialTeamsGameStats> {
    return this.http
      .put<SpecialTeamsGameStats>(`${environment.BaseAddress}SpecialTeamsGameStats/${gameId}/${playerId}`,
        JSON.stringify(specialTeamsGameStats),
        { headers: this.headers });
  }

  public createSpecialTeamsGameStats(specialTeamsGameStats: SpecialTeamsGameStats): Observable<SpecialTeamsGameStats> {
    return this.http
      .post<SpecialTeamsGameStats>(`${environment.BaseAddress}SpecialTeamsGameStats`,
        JSON.stringify(specialTeamsGameStats),
        { headers: this.headers });
  }

  public deleteSpecialTeamsGameStats(gameId: number, playerId: number): Observable<SpecialTeamsGameStats> {
    return this.http
      .delete<SpecialTeamsGameStats>(`${environment.BaseAddress}SpecialTeamsGameStats/${gameId}/${playerId}`,
        { headers: this.headers });
  }

  public getPlayers(): Observable<Player[]> {
    return this.http
      .get<Player[]>(`${environment.BaseAddress}Players`, { headers: this.headers });
  }

  public getPlayersByPlayerId(playerId: number): Observable<Player[]> {
    return this.http
      .get<Player[]>(`${environment.BaseAddress}Players?PlayerId=${playerId}`, { headers: this.headers });
  }

  public updatePlayer(playerId: number, player: Player): Observable<Player> {
    return this.http
      .put<Player>(`${environment.BaseAddress}Player/${playerId}`,
        JSON.stringify(player),
        { headers: this.headers });
  }

  public createPlayer(player: Player): Observable<Player> {
    return this.http
      .post<Player>(`${environment.BaseAddress}Player`,
        JSON.stringify(player),
        { headers: this.headers });
  }

  public deletePlayer(playerId: number): Observable<Player> {
    return this.http
      .delete<Player>(`${environment.BaseAddress}Player/${playerId}`,
        { headers: this.headers });
  }
}
