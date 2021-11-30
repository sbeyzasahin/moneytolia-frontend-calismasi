import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Campaign } from 'src/app/interfaces/campaign';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaigns: Campaign[] = [];

  modalStatus = false;

  campaign_id = new FormControl(0);
  campaign_name = new FormControl('');
  campaign_description = new FormControl('');

  updateForm = new FormGroup({
    id: this.campaign_id,
    name: this.campaign_name,
    description: this.campaign_description
  })

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.createCampaignList();
  }

  createCampaignList() {
    const localStorageCampaings = this.localStorageService.getLocalStorageItem('campaigns') || [];

    this.campaigns = localStorageCampaings;

    let count = 1;

    this.campaigns = this.campaigns.map((campaign) => {

      return { ...campaign, visible: true, id: count++ }
    })

    this.campaigns.sort((a, b) => {
      const firstScore = a.campaign_score;
      const secondScore = b.campaign_score;
      if (firstScore < secondScore) return -1;
      if (firstScore > secondScore) return 1;
      return 0;
    })
  }

  searchCampaign(event: any) {
    const value = event.target.value;

    this.campaigns.forEach((campaign) => {
      campaign.visible = campaign.name.includes(value);
    });
  }

  openUpdateModal(campaign: Campaign | null) {
    this.modalStatus = true;

    this.campaign_id.setValue(campaign?.id)
    this.campaign_name.setValue(campaign?.name)
    this.campaign_description.setValue(campaign?.description)
  }

  closeUpdateModal() {
    this.modalStatus = false;
  }

  updateCampaign() {

    const index = this.campaigns.findIndex((campaign) => campaign.id === this.campaign_id.value as any);

    const newCampaigns = [...this.campaigns];

    const currentCampain = newCampaigns[index];
    newCampaigns[index] = {
      ...currentCampain,
      name: this.campaign_name.value,
      description: this.campaign_description.value,
    }
    this.campaigns = newCampaigns;

    this.updateLocalStorage();

    this.modalStatus = false;
  }

  changeCampaignScore(campaign: Campaign, score: number) {

    const index = this.campaigns.findIndex((orjCampaign) => orjCampaign.id === campaign.id as any);

    const newCampaigns = [...this.campaigns];

    const currentCampain = newCampaigns[index];

    const total = currentCampain.campaign_score + score

    if (total < 0) { return }

    newCampaigns[index] = {
      ...currentCampain,
      campaign_score: total
    }

    this.campaigns = newCampaigns;

    this.updateLocalStorage();
  }

  deleteCampaign(campaign: Campaign) {

    const index = this.campaigns.findIndex((c) => c.id === campaign.id);

    const newCampaigns = [...this.campaigns];

    newCampaigns.splice(index, 1)

    this.campaigns = newCampaigns;

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const campaigns = this.campaigns.map((campaign) => {
      return {
        name: campaign.name,
        description: campaign.description,
        created_date: campaign.created_date,
        campaign_score: campaign.campaign_score
      }
    })
    this.localStorageService.setLocalStorageItem('campaigns', campaigns);
  }

  selectFilterMode(event: any) {

    const filterMode = event.target.value;

    if (filterMode === 'low') {
      this.campaigns.sort((a, b) => {
        let firstScore = a.campaign_score;
        let secondScore = b.campaign_score;
        if (firstScore < secondScore) return -1;
        if (firstScore > secondScore) return 1;
        return 0;
      })
    }
    if (filterMode === 'higher') {
      this.campaigns.sort((a, b) => {
        let firstScore = a.campaign_score;
        let secondScore = b.campaign_score;
        if (firstScore > secondScore) return -1;
        if (firstScore < secondScore) return 1;
        return 0;
      })
    }

  }
}
