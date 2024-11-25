import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  housingLocationList: HousingLocation[] = [ ];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = []

  constructor(){
    //this.housingLocationList = this.housingService.getAllHousingLocation();
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    })
  }
  filterResults(text: string) {
    if(!text) 
      this.filteredLocationList = this.filteredLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );

  }
}