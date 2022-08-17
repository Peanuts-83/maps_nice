import { PopupService } from './popup.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as L from 'leaflet'


@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // Get data form geojson file
  public ports: string = 'assets/data/localisation-des-ports.geojson'

  // Use HttpClient to manage get request & subsrcription
  // Use PopupService to add it to MarkerService
  constructor(
    private http: HttpClient,
    private popup: PopupService) { }

  // Parse file to create all markers and add them to map object
  makePortMarkers(map: L.Map): void {
    this.http.get(this.ports).subscribe((res: any) => {
      for (let p of res.features) {
        const lon = p.geometry.coordinates[0]
        const lat = p.geometry.coordinates[1]
        const marker = L.marker([lat, lon], {
          riseOnHover: true,
          // draggable: true
        })

        const popupText = p.properties
        // Add popup to marker
        marker.bindPopup(this.popup.makePopups(popupText, lon, lat))
        // Add marker to map
        marker.addTo(map)
      }
    })
  }

}
