import { Component, OnInit } from '@angular/core';
import { RemittanceDetailGroupForm } from './remittance-detail-group-form';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent implements OnInit {

  remittanceDetail = new RemittanceDetailGroupForm();

  constructor() { }

  ngOnInit(): void {
  }

}
