import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth-service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { CampaignListItemComponent } from './pages/campaign-list-item/campaign-list-item.component';


localStorage.setItem('user', JSON.stringify({ username: 'ayse', password: '1234' }));
if(localStorage.getItem('campaigns') === null ) {
  localStorage.setItem('campaigns', JSON.stringify([
    {
      name: 'Kampanya 1',
      description: '%30 İndirim',
      created_date: new Date(),
      campaign_score: 0
    },
    {
      name: 'Kampanya 2',
      description: '%50 İndirim + %10 İndirim',
      created_date: new Date(),
      campaign_score: 0
    },
    {
      name: 'Kampanya 3',
      description: '%70 İndirim',
      created_date: new Date(),
      campaign_score: 0
    },
    {
      name: 'Kampanya 4',
      description: '%10 İndirim',
      created_date: new Date(),
      campaign_score: 0
    },
  ]));
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CampaignsComponent,
    CreateCampaignComponent,
    DashboardComponent,
    CardComponent,
    CampaignListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
