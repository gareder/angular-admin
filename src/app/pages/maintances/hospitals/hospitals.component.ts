import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs: Subscription;
  public tempHospitals: Hospital[] = [];

  constructor(private hospitalService: HospitalService,
              private modalImageService: ModalImageService,
              private searchService: SearchesService) { }

  ngOnInit(): void {
    this.getHospitals();
    this.imgSubs = this.modalImageService.newImage.pipe(delay(200)).subscribe(img => this.getHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
      this.tempHospitals = hospitals;
      this.loading = false;
    });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe(resp => {
      Swal.fire('Updated', hospital.name, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {

    Swal.fire({
      title: 'Delete hospital?',
      text: `You will delete ${ hospital.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id).subscribe(() => {
          this.getHospitals();
          Swal.fire('Deleted!', `${ hospital.name } has been deleted`, 'success');
        });
      }
    });
  }

  async openSwalModal() {
    const { value = '' } = await Swal.fire<string>({
      text: 'Input the Hospital name',
      title: 'Create Hospital',
      input: 'text',
      inputPlaceholder: 'Please type the name of the Hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe(resp => {
        this.getHospitals();
        // this.hospitals.push(resp.hospital);
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(searchQuery: string) {
    // this.term = searchQuery;
    if (searchQuery.length === 0) {
      // return this.getHospitals();
      return this.hospitals = this.tempHospitals;
    }

    this.searchService.search('hospitals', searchQuery).subscribe(resuls => {
      // this.searching = true;
      this.hospitals = resuls;
    });
  }

}
