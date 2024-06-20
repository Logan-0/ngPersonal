import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent},
    { path: 'projects', component: ProjectsComponent },
    { path: '**', component: NotfoundComponent }
];

