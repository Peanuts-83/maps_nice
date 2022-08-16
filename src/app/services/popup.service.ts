import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  makePopups(data: any, lon: string, lat: string): string {
    return `<div><strong>${data.NOM}</strong></div>
    <div>Code INSEE: ${data.CODE_INSEE}</div>
    <div class="popup_coords">longitude: ${lon}</div>
    <div class="popup_coords">latitude: ${lat}</div>`
  }

  constructor() { }
}
