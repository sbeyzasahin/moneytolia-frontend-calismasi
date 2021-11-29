import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/campaign';
import { SidebarListItem } from 'src/app/interfaces/sidebar-list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  list: SidebarListItem[] = [
    { name: 'Kampanya Listesi', path: 'kampanya-listesi' },
    { name: 'Kampanya Oluştur', path: 'kampanya-olustur' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
