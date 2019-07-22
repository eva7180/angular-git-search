import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  title: string;
  displayQuery: string;
  constructor(
    private GitSearchService: GitSearchService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.userSearch();   
    })

    this.route.data.subscribe( (result) => {
      this.title = result.title
    });

  }

  userSearch =  () => {
    this.GitSearchService.gitUsers(this.searchQuery).then( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/user-search/' + this.searchQuery])
  }

}
