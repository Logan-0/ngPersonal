import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  screenHeight: number;
  screenWidth: number;
  viz:boolean = false
  repos:boolean = false

  constructor() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.resetArr();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  resetArr() {
    this.viz = false;
    this.repos = false;
  }

  showVisuals() {
    this.viz = true
    this.repos = false;
  }

  showRepositories() {
    this.viz = false;
    this.repos = true;
  }
}
