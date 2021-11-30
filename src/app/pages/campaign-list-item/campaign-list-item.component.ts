import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';

@Component({
  selector: 'app-campaign-list-item',
  templateUrl: './campaign-list-item.component.html',
  styleUrls: ['./campaign-list-item.component.scss']
})
export class CampaignListItemComponent implements OnInit {

  @Input() campaign: Campaign | null = null;

  @Output() onClickedUpdateCampaign: EventEmitter<Campaign | null> = new EventEmitter();
  @Output() onClickedDeleteCampaign: EventEmitter<Campaign | null> = new EventEmitter();
  @Output() onClickedPlusMinus: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clikedUpdate(campaign: Campaign | null) {
    this.onClickedUpdateCampaign.emit(campaign);
  }

  clikedDelete(campaign: Campaign | null) {
    this.onClickedDeleteCampaign.emit(campaign);
  }

  clickedPlus() {
    this.onClickedPlusMinus.emit(1);
  }
  clickedMinus() {
    this.onClickedPlusMinus.emit(-1);
  }
}
