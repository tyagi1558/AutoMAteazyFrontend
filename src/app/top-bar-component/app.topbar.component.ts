import { Component, ElementRef, ViewChild,Output,EventEmitter,Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    constructor() { }
  // Define an output property to emit the clicked link identifier
  @Output() linkClicked = new EventEmitter<string>();
  @Input() activeTab: string = 'all';

  onLinkClick(link: string) {
    // Emit the clicked link identifier to the parent component
    this.linkClicked.emit(link);
  }}
