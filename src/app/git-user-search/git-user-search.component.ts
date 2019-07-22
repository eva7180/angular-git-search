import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitUsers } from '../git-users';

@Component({
  selector: 'app-git-user-search',
  templateUrl: './git-user-search.component.html',
  styleUrls: ['./git-user-search.component.css']
})
export class GitUserSearchComponent implements OnInit {
  searchResults: GitUsers;
  searchQuery: string;

  constructor(private GitSearchService: GitSearchService) { }

  ngOnInit() {
    this.GitSearchService.gitUsers('tom').then( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  userSearch =  (query: string) => {
    this.GitSearchService.gitUsers(this.searchQuery).then( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

}
