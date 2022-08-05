import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PlaygroundComponent } from './playground/playground.component';
import { RouterModule } from '@angular/router';
import { CurrentViewComponent } from './current-view/current-view.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsManagementComponent } from './cards-management/cards-management.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PlaygroundComponent,
    CurrentViewComponent,
    CardsManagementComponent,
    CardDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: PlaygroundComponent },
      { path: 'current-view', component: CurrentViewComponent },
      { path: 'cards-management', component: CardsManagementComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
