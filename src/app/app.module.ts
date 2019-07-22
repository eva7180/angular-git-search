import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GitSearchService } from './git-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { GitUserSearchComponent } from './git-user-search/git-user-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '',
    component: HomePageComponent
  },
  { path: 'git-search',
    redirectTo: '/git-search/angular/1',
    pathMatch: 'full'
  },
  { path: 'git-search/:query',
    component: GitSearchComponent,
    data: { 
      title: 'Git Search'
    }
  },
  { path: 'git-search/:query/:page',
    component: GitSearchComponent,
    data: { 
      title: 'Git Search'
    }
  },
  { path: 'user-search',
    redirectTo: '/user-search/angular',
    pathMatch: 'full'
  },
  { path: 'user-search/:query',
    component: GitUserSearchComponent,
    data: { 
      title: 'Git User Search'
    }
  },
  { path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    GitUserSearchComponent,
    HomePageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GitSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
