import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { Observable } from 'rxjs';

import { Project } from './models/project.dto';
import { ProjectStoreService } from '../../services/project-store.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {
  loading = true;
  projects$!: Observable<Project[]>;

  constructor(private projectStore: ProjectStoreService) { }

  ngOnInit() {
    // `getProjects()` internally triggers `load()` if not yet fetched
    this.projects$ = this.projectStore.getProjects();

    // Optional: if you want to toggle `loading` when projects load
    this.projects$.subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }
}
