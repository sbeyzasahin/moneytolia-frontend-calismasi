import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  // Çalışma pdfinde kampanya adı ve kampanya açıklaması zorunludur (boş bırakılamaz) ibaresi olmadığından,
  // FormControllerinde Validator kullanmadım.

  campaign_name = new FormControl();
  campaign_description = new FormControl();
  createCampaignForm = new FormGroup({
    name: this.campaign_name,
    description: this.campaign_description
  });

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  saveCampaign() {

    const localStorageCampaings = this.localStorageService.getLocalStorageItem('campaigns') || [];

    const campaigns = localStorageCampaings;

    const campaign = {
      name: this.campaign_name.value,
      description: this.campaign_description.value,
      campaign_score: 0,
      created_date: new Date()
    }

    campaigns.push(campaign);

    this.localStorageService.setLocalStorageItem('campaigns', campaigns);
  }
}
