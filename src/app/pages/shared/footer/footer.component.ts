import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bms-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  defaultYear: number | undefined;

  constructor() { }

  ngOnInit() {
    this.defaultYear = new Date().getFullYear();
  }

}
