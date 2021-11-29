import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Campaign } from 'src/app/interfaces/campaign';

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

  constructor() { }

  ngOnInit(): void {

    this.createCampaignList();
  }

  createCampaignList() {
    const localStorageCampaings = localStorage.getItem('campaigns') || '[]';

    this.campaigns = JSON.parse(localStorageCampaings);

    let count = 1;

    this.campaigns = this.campaigns.map((campaign) => {

      return { ...campaign, visible: true, id: count++ }
    })

    this.campaigns.sort((a, b) => {
      let firstScore = a.campaign_score;
      let secondScore = b.campaign_score;
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

    const findIndexCampaign = this.campaigns.findIndex((campaign) => campaign.id === this.campaign_id.value as any);

    const newCampaigns = this.campaigns.concat();

    newCampaigns[findIndexCampaign].name = this.campaign_name.value
    newCampaigns[findIndexCampaign].description = this.campaign_description.value

    this.campaigns = newCampaigns;

    this.updateLocalStorage();

    this.modalStatus = false;
  }

  changeCampaignScore(value: { campaign: Campaign, score: number }) {

    const { campaign, score } = value;

    const findIndexCampaign = this.campaigns.findIndex((orCampaign) => orCampaign.id === campaign.id as any);

    const newCampaigns = this.campaigns.concat();


    newCampaigns[findIndexCampaign].campaign_score += score

    if (newCampaigns[findIndexCampaign].campaign_score < 0) {
      newCampaigns[findIndexCampaign].campaign_score = 0
    }

    this.campaigns = newCampaigns;

    this.updateLocalStorage();
  }

  deleteCampaign(campaign: Campaign | null) {

    const findIndexCampaign = this.campaigns.findIndex((orCampaign) => orCampaign.id === campaign?.id as any);

    const newCampaigns = this.campaigns.concat();

    newCampaigns.splice(findIndexCampaign, 1);

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
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
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
