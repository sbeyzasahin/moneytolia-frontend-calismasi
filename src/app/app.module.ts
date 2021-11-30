import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { CampaignListItemComponent } from './pages/campaign-list-item/campaign-list-item.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';

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
  providers: [AuthService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
