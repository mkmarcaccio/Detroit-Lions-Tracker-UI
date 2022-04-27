import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sideNavToggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onToggleSideNav = () => {
    this.sideNavToggle.emit();
  }

}
