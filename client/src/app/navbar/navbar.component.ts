import { Location, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  screenHeight: number;
  screenWidth: number;
  navType: string = '';

  constructor(private router:Router, private loc:Location) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '' || event.url  === '/') {
          this.navType = "nav-splash";
        } else {
          this.navType = "nav-other"
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}