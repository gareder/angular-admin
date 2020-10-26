import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Medic } from '../../models/medic.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public medics: Medic[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ query }) => this.searchGlobal(query));
  }

  searchGlobal(searchQuery: string) {
    this.searchesService.searchGlobal(searchQuery).subscribe((resp: any) => {
      this.users = resp.users;
      this.hospitals = resp.hospitals;
      this.medics = resp.medics;
    });
  }

  openMedic(medic: Medic) {
    console.log(medic);
  }

}
