import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  public entries = [];
  public focusedEntry = null;
  public news = null;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.getJSON().subscribe(data => {
      this.entries = data.DATA;
      const group = encodeURIComponent(this.route.snapshot.paramMap.get('group'));
      this.entries.forEach((entry) => {
        if (encodeURIComponent(entry.Name) === group) {
          this.focusedEntry = entry;
        }
      });
      if (!this.focusedEntry) {
        alert('Sorry, your group has not been found.');
        this.router.navigate(['/']);
      } else {
        this.getLatestNewsAbout(this.focusedEntry.Name).subscribe(hnResponse => {
          this.news = hnResponse.hits;
        });
      }
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

  public getLatestNewsAbout(group: string): Observable<any> {
    return this.http.get('https://hn.algolia.com/api/v1/search_by_date?query=' + encodeURIComponent(group.toLowerCase()) + '&tags=story');
  }

  ngOnInit(): void {
  }

}
