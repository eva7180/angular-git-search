import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  pageNumber: string;
  pageNum: number;
  constructor(
    private GitSearchService: GitSearchService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.pageNumber = params.get('page');
      this.pageNum = parseInt(this.pageNumber, 10);
      this.gitSearch();   
    })

    this.route.data.subscribe( (result) => {
      this.title = result.title
    });
  }

  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery, this.pageNumber).then( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/git-search/' + this.searchQuery + '/1'])
  }

  nextPage = () => {
    if (this.pageNumber) {
      this.pageNumber = (this.pageNum + 1).toString();
    } else {
      let page = 1;
      this.pageNumber = (page + 1).toString();
    }
    this.router.navigate(['/git-search/' + this.searchQuery + '/' + this.pageNumber])
  }

  prevPage = () => {
    this.pageNumber = (this.pageNum - 1).toString();
    this.router.navigate(['/git-search/' + this.searchQuery + '/' + this.pageNumber])
  }

}
