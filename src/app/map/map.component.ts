import { ShapeService } from './../services/shape.service'
import { MarkerService } from '../services/marker.service'
import { AfterViewInit, Component, OnInit } from '@angular/core'
import * as L from 'leaflet'


// Icons must be managed from assets in angular.json
// { "glob": "**/*",
//   "input": "node_modules/leaflet/dist/images/",
//   "output": "./assets"
// }
// then directly imported from dist/assets
const iconRetinaUrl = 'assets/marker-icon-2x.png'
const iconUrl = 'assets/marker-icon.png'
const shadowUrl = 'assets/marker-shadow.png'
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = iconDefault

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
// Use AfterViewInit to access #map from the DOM
export class MapComponent implements AfterViewInit {
  //Init shapes
  private shapes
  // Init Map object (the container) from Leaflet lib
  private map: L.Map

  private initMap(): void {
    // #map as a ref in template, and options
    this.map = new L.Map('map', {
      center: [43.6962, 7.3047],
      zoom: 13
    })
    // Init Tiles object (the map image) from Leaflet lib
    // URL for image map ref, and options
    // Image map is made of multiple tiles, initially not placed correctly
    // Add "./node_modules/leaflet/dist/leaflet.css" to styles in angular.json
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    // Add tiles to map object
    tiles.addTo(this.map)
  }

  // Generate shapes & add them to the map
  private highlight(e) {
    const layer: L.FeatureGroup = e.target
    layer.setStyle({
      weight: 10,
      opacity: .6,
      fillOpacity: .4,
      fillColor: 'orangered'
    })
  }

  private outlight(e) {
    const layer: L.FeatureGroup = e.target
    layer.setStyle({
      weight: 3,
      opacity: .3,
      fillOpacity: .2,
      fillColor: 'orange'
    })
  }

  private initCitiesLayer() {
    const citiesLayer = L.geoJSON(this.shapes, {
      style: (feature) => ({
        weight: 3,
        opacity: .3,
        color: 'darkblue',
        fillOpacity: .2,
        fillColor: 'orange'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: e => this.highlight(e),
          mouseout: e => this.outlight(e)
        })
      )
    })

    this.map.addLayer(citiesLayer)
  }

  // Inject markersService
  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService) { }

  ngAfterViewInit(): void {
    this.initMap()
    // Init shapes
    this.shapeService.getShapes().subscribe(shapes => {
      this.shapes = shapes
      this.initCitiesLayer()
    })
    // Init the markers from the service
    this.markerService.makePortMarkers(this.map)
  }

}
