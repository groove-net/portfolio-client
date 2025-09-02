import { Component, Injectable } from '@angular/core';
import { Devlog } from './models/devlog.dto';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';
import { SlicePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-devlogs',
  imports: [RouterLink, SlicePipe, DatePipe],
  templateUrl: './devlogs.html',
  styleUrl: './devlogs.css'
})
@Injectable({providedIn: 'root'})
export class Devlogs {
  loading: boolean = true;
  projectTitle! : string;
  devlogs: Devlog[] = [];
  selectedDevlog!: Devlog;

  constructor (private http: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.getDevlogs();
  }

  ngOnInit(): void {
    this.projectTitle = this.route.snapshot.paramMap.get('title')!;
  }

  async selectDevlog(devlog: Devlog) {
    if (devlog.contentAsHtml == undefined)
      devlog.contentAsHtml = this.sanitizer.bypassSecurityTrustHtml(await marked(devlog.content));
    this.selectedDevlog = devlog;
  }

  async getDevlogs() {
    this.http
      .get<Devlog[]>('http://localhost:5134/api/devlogs/'+this.route.snapshot.paramMap.get('title'), {})
      .subscribe(async (response) => {
        this.devlogs = response;
        this.selectedDevlog = this.devlogs[0];
        if (this.selectedDevlog.content == undefined)
          this.selectedDevlog.content = "Nothing yet!";
        this.selectedDevlog.contentAsHtml = this.sanitizer.bypassSecurityTrustHtml(await marked(this.selectedDevlog.content));
        this.loading = false;
      })
  }

  onDevlogChange(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.selectDevlog(this.devlogs[selectEl.selectedIndex]);
  }

}
