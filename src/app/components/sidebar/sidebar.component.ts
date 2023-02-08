import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/shared/services/communication.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() showMenu: boolean;
  @Input() userId: string;

  constructor(
    private router: Router,
    private communicationService: CommunicationService
  ) {
    this.showMenu = false;
    this.userId = ""
  }

  ngOnInit() {
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  personajes() {
    this.router.navigateByUrl('personajes');
  }

  miListaPersonajes() {
    this.router.navigateByUrl('mi-lista');
  }

  perfil() {
    this.router.navigate(['/perfil',this.userId]);
  }
}
