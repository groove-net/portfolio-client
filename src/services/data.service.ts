// global-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from './api.service';

export interface Qna {
  q: string,
  a: string
}

export interface Faq {
  image: string,
  qna: Qna[]
}

export interface Contact {
  image: string
  phone: string,
  email: string,
  instagram: string,
  github: string,
  discord: string
}

export interface GlobalData {
  art: string[],
  faq: Faq
  contact: Contact
}

export interface MiscAsHtml {
  html: SafeHtml | null
}

interface Payload {
  content: string
}

@Injectable({ providedIn: 'root' })
export class GlobalDataService {
  private dataSubject = new BehaviorSubject<GlobalData | null>(null);
  private miscSubject = new BehaviorSubject<MiscAsHtml | null>(null);
  data$ = this.dataSubject.asObservable();
  misc$ = this.miscSubject.asObservable();

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.apiService.get<Payload>('/api/portfoliodata').toPromise(),
        this.apiService.get<Payload>('/api/miscmd').toPromise()
      ])
        .then(async ([portfolio, misc]) => {
          this.dataSubject.next(JSON.parse(portfolio!.content));
          this.miscSubject.next({
            html: this.sanitizer.bypassSecurityTrustHtml(await marked(misc!.content))
          });
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  get data(): GlobalData | null {
    return this.dataSubject.value;
  }

  get misc(): MiscAsHtml | null {
    return this.miscSubject.value;
  }
}
