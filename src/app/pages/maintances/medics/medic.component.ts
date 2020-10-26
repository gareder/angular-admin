import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { MedicService } from '../../../services/medic.service';
import { Hospital } from '../../../models/hospital.model';
import { Medic } from '../../../models/medic.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  public medicForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital;
  public selectedMedic: Medic;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicService: MedicService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Getting the ID
    this.activatedRoute.params.subscribe(({ id }) => this.getMedic(id));
    this.getHospitals();
    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    // Observable to "listen" to the form's hospital
    this.medicForm.get('hospital').valueChanges.subscribe(hospitalId => {
      // With the Id we can run over the hospitals array to get the instance of the hospital
      this.selectedHospital = this.hospitals.find(hospital => hospital._id === hospitalId);
    });

  }

  getMedic(id: string) {
    this.medicService.getMedicById(id).pipe(delay(100)).subscribe(medic => {
      // Getting the neeeded properties
      const { name, hospital: { _id }} = medic;
      this.selectedMedic = medic;
      this.medicForm.setValue({ name, hospital: _id });
    });
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe((hospitals: Hospital[]) => this.hospitals = hospitals);
  }

  createMedic() {
    const { name } = this.medicForm.value;

    if (this.selectedMedic) {
      // Update
      const data = {
        ...this.medicForm.value,
        _id: this.selectedMedic._id
      }
      this.medicService.updateMedic(data).subscribe(resp => {
        console.log(resp);
        Swal.fire('Success', `${ name } has been updated successfully!`, 'success');
      });
    } else {
      // Create
      this.medicService.createMedic(this.medicForm.value).subscribe((resp: any) => {
        Swal.fire('Success', `${ name } has been registered successfully!`, 'success');
        this.router.navigateByUrl(`/dashboard/medic/${ resp.medic._id}`);
      });
    }
  }

}
