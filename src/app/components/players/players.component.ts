import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { PlayersAddEditDialogComponent } from '../players-add-edit-dialog/players-add-edit-dialog.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  private subscriptionList: Subscription = new Subscription();
  public dialogRef;

  public dataSourcePlayers: MatTableDataSource<Player> = new MatTableDataSource();
  public players: Player[];

  displayedColumns: string[] = [
    'jerseyNumber',
    'firstName',
    'lastName',
    'position',
    'unit',
    'actions'
  ];

  constructor(
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.detroitLionsTrackerService.getPlayers()
      .subscribe(response => {
        this.players = response;
        this.players = this.players.filter(player => player.isOnRoster == true)
        this.dataSourcePlayers.data = this.players;
      });
  }

  addEditPlayers(input: any = new Player) {
    if (input.playerId === undefined) {
      input.playerId = 0;
    }

    const dialogRef = this.dialog.open(PlayersAddEditDialogComponent, {
      minWidth: "600px",
      height: 'auto',
      disableClose: true,
      data: input
    });

    this.subscriptionList.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (input.playerId !== 0) {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.updatePlayer(input.playerId, result).subscribe(updateResult => {
                let updateItem = this.players.find(player => player.playerId === updateResult.playerId)
                let index = this.players.indexOf(updateItem);
                this.players[index] = updateResult;
                this.dataSourcePlayers.data = this.players;
                this.getRefreshedPlayers();
              },
              ));
          } else {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.createPlayer(result).subscribe(createResult => {
                this.players.push(createResult);
                this.dataSourcePlayers.data = this.players;
                this.getRefreshedPlayers();
              },
              ));
          }
        }
      })
    );
  }

  openDeleteDialog(templateRef, item) {
    this.dialogRef = this.dialog.open(templateRef, {
      minWidth: "auto",
      height: 'auto',
      data: item,
      disableClose: true
    });
  }

  deletePlayers(item) {
    this.subscriptionList.add(
      this.detroitLionsTrackerService.deletePlayer(item.playerId).subscribe(deleteResult => {
        this.players = this.players.filter(player => player.playerId !== item.playerId)
        this.dataSourcePlayers.data = this.players;
        this.dialogRef.close();
        this.getRefreshedPlayers();
      },
      ));
  }

  public filterChanged(value: string) {
    value = value == null ? "" : value.trim().toLowerCase();
    this.dataSourcePlayers.filter = value;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  getRefreshedPlayers() {
    this.detroitLionsTrackerService.getPlayers()
      .subscribe(response => {
        this.players = response;
        this.players = this.players.filter(player => player.isOnRoster == true)
        this.dataSourcePlayers.data = this.players;
      });
  }
}
