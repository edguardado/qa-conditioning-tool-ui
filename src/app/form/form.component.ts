import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiHelper } from '../../api-helper/ApiHelper';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @ViewChild('responseContainer', { static: true }) responseContainer!: ElementRef;

  constructor(private apiHelper: ApiHelper) { }

  fetchData(): void {
    const host = '10.150.4.245';
    const localhost = 'localhost';
    this.apiHelper.get('http://'+localhost+':3000/create-ldap-instance?env=stage')
  .then((data:any) => {
    console.log('Response:', data);
    this.displayResponse(data)
  })
  .catch((error) => {
    this.displayResponse(error)
    console.error('Error:', error);
  });
  }

  getResponseText(response: any): string {
    if (typeof response === 'object') {
      return JSON.stringify(response);
    } else {
      return response.toString();
    }
  }

  displayResponse(response: string): void {
    this.responseContainer.nativeElement.innerHTML = response;
  }
}