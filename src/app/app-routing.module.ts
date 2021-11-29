import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'kampanya-listesi', component: CampaignsComponent },
      { path: 'kampanya-olustur', component: CreateCampaignComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
