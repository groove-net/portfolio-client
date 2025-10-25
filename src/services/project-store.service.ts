import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Project } from '../app/projects/models/project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreService {
  private projectsSub = new BehaviorSubject<Project[] | null>(null);
  private loadingPromise: Promise<Project[]> | null = null;

  constructor(private apiService: ApiService) { }

  // Load projects once. Subsequent calls return cached value or the same in-flight promise.
  load(): Promise<Project[]> {
    const cached = this.projectsSub.value;
    if (cached) {
      return Promise.resolve(cached);
    }
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = firstValueFrom(this.apiService.get<Project[]>('/api/projects'))
      .then(data => {
        // Publish initial projects (without images)
        this.projectsSub.next(data);

        // For each project, load its cover image and patch the project object when available.
        data.forEach(project => {
          this.getImage(project.name).subscribe(src => {
            // attach imgSrc the same way your component did
            (project as any).imgSrc = src;
            // Emit a new array reference so subscribers get change detection
            const current = this.projectsSub.value;
            if (current) {
              this.projectsSub.next([...current]);
            }
          }, () => {
            // ignore individual image errors
          });
        });

        return data;
      })
      .finally(() => {
        this.loadingPromise = null;
      });

    return this.loadingPromise;
  }

  // Observable consumers can subscribe to this; it will emit only after data is loaded.
  getProjects(): Observable<Project[]> {
    // Trigger load if nothing has started yet.
    if (!this.projectsSub.value && !this.loadingPromise) {
      // Fire and forget; subscribers will receive once projectsSub.next runs.
      this.load().catch(() => { /* swallow to avoid unhandled rejection */ });
    }

    return this.projectsSub.asObservable().pipe(
      filter((v): v is Project[] => v !== null),
      map(v => v)
    );
  }

  // Return an Observable<string> for the cover image (maps to data URL same as component)
  getImage(repo: string): Observable<string> {
    return this.apiService.get<{ name: string }>(`/api/coverimage/${repo}`)
      .pipe(
        map(res => `data:image/jpeg;base64,${res.name}`) // change mime if PNG etc.
      );
  }

  // Synchronous cached snapshot (may be null until load completes)
  snapshot(): Project[] | null {
    return this.projectsSub.value;
  }

  // Force a refresh from server
  refresh(): Promise<Project[]> {
    this.projectsSub.next(null);
    return this.load();
  }
}
