import { Component, Injectable } from '@angular/core';
import { Project } from './models/project.dto';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, NgClass],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
@Injectable({providedIn: 'root'})
export class Projects {
  loading: boolean = true;
  projects: Project[] = [];

  constructor(private http: HttpClient) {
    this.getProjects();
  }

  getProjects() {
    this.http
      .get<Project[]>('http://10.43.165.186:8080/api/projects', {})
      .subscribe((response) => {
        this.projects = response;
        // Get all cover imgages for projects
        this.projects.forEach(project => {
          this.getImage(project.name).subscribe(src => project.imgSrc = src);
          console.log(project.imgSrc);
        });
        this.loading = false;
      })
  }

  getImage( repo: string ) {
    return this.http.get<{ name: string }>(
      `http://10.43.165.186:8080/api/coverimage/${repo}`
    ).pipe(
      map(res => `data:image/jpeg;base64,${res.name}`) // change mime if PNG etc.
    );
  }
}
