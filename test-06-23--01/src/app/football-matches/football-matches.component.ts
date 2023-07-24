import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
@Component({
  selector: 'app-football-matches',
  templateUrl: './football-matches.component.html',
  styleUrls: ['./football-matches.component.scss']
})
export class FootballMatchesComponent implements OnInit {
  public years: number[] = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
  public selectedYear: number;
  public competitions: ApiResponse;

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {

  }

  public onClickYear(year: number) {
    this.selectedYear = year;
    this.http.get<ApiResponse>(`https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`)
      .subscribe((response) => {
        this.competitions = response;
      });
  }

}
export interface Match {
  name: string;
  winner: string;
}

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}
interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}
