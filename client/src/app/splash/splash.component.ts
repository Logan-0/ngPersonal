import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {

  screenHeight: number = 768;
  screenWidth: number = 768;
  graphic: string = "../../assets/images/cabin2.png";
  logo: string = "../../assets/images/Logan0DeveloperLogoPt3.png"

  constructor() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}
