import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

}
