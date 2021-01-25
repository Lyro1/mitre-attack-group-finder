import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public entries = [];
  public tags = [];

  public filter = '';
  public filteredTags = [];
  public filteredEntries = [];

  public showTagsList = false;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.entries = data.DATA;
      this.findTags();
    });
  }

  onSearchBarFocusIn() {
    this.showTagsList = true;
  }

  onSearchChange(value: string) {
    this.filterTags(value);
  }

  onSearchBarFocusOut() {
    this.showTagsList = false;
  }

  onSelectTag(tag) {
    this.filter = tag;
    this.filterEntries();
    this.showTagsList = false;
  }

  onSubmit(event: any) {
    this.filter = event.target.activity.value;
    this.filterEntries();
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

  public findTags() {
    if (this.entries) {
      this.entries.forEach((entry) => {
        if (entry.Tags !== null && entry.Tags !== '') {
          entry.Tags.forEach((tag) => {
            if (this.tags.indexOf(tag) === -1) {
              this.tags.push(tag);
            }
          });
        }
      });
      this.filterTags('');
    }
  }

  public filterTags(filter) {
    this.filteredTags = [];
    if (this.tags) {
      if (!filter || filter === '') {
        this.filteredTags = this.tags;
      } else {
        this.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(filter.toLowerCase())) {
            this.filteredTags.push(tag);
          }
        });
      }
      if (this.filteredTags.length > 1) {
        // tslint:disable-next-line:only-arrow-functions
        this.filteredTags.sort(function(a, b) {
          const textA = a.toUpperCase();
          const textB = b.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
    }
  }

  public filterEntries() {
    this.filteredEntries = [];
    if (this.entries && this.filter && this.filter !== '') {
      this.entries.forEach((entry) => {
        if (entry.Tags && entry.Tags.indexOf(this.filter) > -1) {
          this.filteredEntries.push(entry);
        }
      });
    }
  }

  public encodeURL(value) {
    return encodeURIComponent(value);
  }

  ngOnInit(): void {
  }

}
