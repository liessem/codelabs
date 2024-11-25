import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = 0;
  housingLocation: HousingLocation | undefined;
  housingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocationSelected => {
      this.housingLocation = housingLocationSelected;
    })
    //this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    /*
    this.housingService.getAllHousingLocations().then((housingLocationListAll: HousingLocation[]) => {
        this.housingLocationList = housingLocationListAll;
      })
    */
    

  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}