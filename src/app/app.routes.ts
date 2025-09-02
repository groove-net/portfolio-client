import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Projects } from './projects/projects';
import { Art } from './art/art';
import { Misc } from './misc/misc';
import { Faq } from './faq/faq';
import { Contact } from './contact/contact';
import { Devlogs } from './devlogs/devlogs';

export const routes: Routes = [
  { path: '', component: Home, },
  { path: 'projects', component: Projects, },
  { path: 'projects/:title', component: Devlogs, },
  { path: 'art', component: Art, },
  { path: 'misc', component: Misc, },
  { path: 'faq', component: Faq, },
  { path: 'contact', component: Contact, }
];
