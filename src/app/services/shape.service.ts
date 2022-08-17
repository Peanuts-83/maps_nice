import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  private shapes: string = 'assets/data/limit_cities.geojson'

  constructor(private http: HttpClient) { }

  getShapes() {
    return this.http.get(this.shapes)
  }
}
