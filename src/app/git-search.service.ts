import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];

  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];

  constructor(private http: HttpClient) {
      
  }

  gitSearch = (query: string, page: string): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
        if (this.cachedValues[query]) {
            resolve(this.cachedValues[query])
        }
        else {
          this.http.get('https://api.github.com/search/repositories?q=' + query + '&page=' + page + '&per_page=8')
          .toPromise()
          .then( (response) => {
              resolve(response as GitSearch)
          }, (error) => {
              reject(error);
          })
        }
    })
    return promise;
  }

  gitUsers = (query: string): Promise<GitUsers> => {
    let promise = new Promise<GitUsers>((resolve, reject) => {
      if (this.cachedUsers[query]) {
        resolve(this.cachedUsers[query])
      }
      else {
        this.http.get('https://api.github.com/search/users?q=' + query)
        .toPromise()
        .then( (response) => {
          resolve(response as GitUsers)
        }, (error) => {
          reject(error);
        })
      } 
    })
    return promise;

  }
}