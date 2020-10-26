import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MedicService } from '../../../services/medic.service';
import { Medic } from '../../../models/medic.model';
import { SearchesService } from '../../../services/searches.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit, OnDestroy {

  public medics: Medic[] = [];
  public loading: boolean = true;
  public tempMedics: Medic[] = [];
  public imgSubs: Subscription;

  constructor(private medicService: MedicService, private searchService: SearchesService, private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.getMedics();
    this.imgSubs = this.modalImageService.newImage.pipe(delay(200)).subscribe(img => this.getMedics());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getMedics() {
    this.loading = true;
    this.medicService.getMedics().subscribe(medics => {
      this.medics = medics;
      this.loading = false;
      this.tempMedics = medics;
    });
  }

  search(searchQuery: string) {
    // this.term = searchQuery;
    if (searchQuery.length === 0) {
      return this.medics = this.tempMedics;
    }

    this.searchService.search('medics', searchQuery).subscribe(resuls => {
      // this.searching = true;
      this.medics = resuls;
    });
  }

  openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic._id, medic.img);
  }

  deleteMedic(medic: Medic) {

    Swal.fire({
      title: 'Delete medic?',
      text: `You will delete ${ medic.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedic(medic._id).subscribe(() => {
          this.getMedics();
          Swal.fire('Deleted!', `${ medic.name } has been deleted`, 'success');
        });
      }
    });
  }

}
