import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  inputData: any = `1/11/20 : 500 + 3,000 + 240
  2/11/20 : 83 + 2,436.52 + 129
  3/11/20 : 4,649
  4/11/20 : 
  5/11/20 : 
  6/11/20 : 590
  7/11/20 : 
  8/11/20 : 
  9/11/20 : 
  10/11/20 : 
  11/11/20 : 
  12/11/20 : 220
  13/11/20 : 
  14/11/20 : 
  15/11/20 : 
  16/11/20 : 3,034 + 4,479
  17/11/20 : 
  18/11/20 : 
  19/11/20 : 3,479
  20/11/20 : 
  21/11/20 : 
  22/11/20 : 
  23/11/20 : 
  24/11/20 : 
  25/11/20 : 
  26/11/20 : 
  27/11/20 : 49
  28/11/20 : 
  29/11/20 : 
  30/11/20 : `;
  newMonth: any = '';
  monthlyTotal: any = '';
  generateButtonClicked: boolean = false;

  ngOnInit(): void {
  }

  generate() {
    this.generateButtonClicked = true;
    this.homeService.calculateFunct(this.inputData);
    this.newMonth = this.homeService.newMonth;
    this.monthlyTotal = this.homeService.monthlyTotal;
  }

  copyFunc(type: 'new' | 'total') {
    if (this.generateButtonClicked) {
      if (type === 'new')
        this.homeService.copyText(this.newMonth);
      else if (type === 'total')
        this.homeService.copyText(this.monthlyTotal);
    }
    else
      alert('Click Generate then Copy !!')
  }
}
