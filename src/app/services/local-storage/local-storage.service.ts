import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    this.setLocalStorageItem('user', { username: 'ayse', password: '1234' });
    if (this.getLocalStorageItem('campaigns') === null) {

      const campaignList = [
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
      ]
      this.setLocalStorageItem('campaigns', campaignList);
    }
  }

  setLocalStorageItem(title: string, data: any) {
    localStorage.setItem(title, JSON.stringify(data));
  }

  getLocalStorageItem(title: string) {
    return JSON.parse(localStorage.getItem(title) as any);
  }
}
