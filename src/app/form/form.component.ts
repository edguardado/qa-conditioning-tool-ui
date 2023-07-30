import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiHelper } from '../../api-helper/ApiHelper';
import {ProgressBarMode} from '@angular/material/progress-bar';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @ViewChild('responseContainer', { static: true }) responseContainer!: ElementRef;
  mode: ProgressBarMode = 'indeterminate'
  constructor(private apiHelper: ApiHelper, ) { }

  showProgressBar = false;
  fetchData(): void {

    const host = '10.150.4.245';
    const localhost = 'localhost';
    this.showProgressBar=true;
    this.apiHelper.get('http://'+host+':3000/create-ldap-instance?env=stage')
  .then((data:any) => {
    console.log('Response:', data);
    this.showProgressBar=false;
    this.displayResponse(data)
  })
  .catch((error) => {
    this.showProgressBar=false;
    this.displayResponse(error)
    console.error('Error:', error);
  });
  }

  getProgressBar() {
    return this.showProgressBar;
  }

  createInstanceStacks(): void {
    const host = '10.150.4.245';
    const localhost = 'localhost';
    this.apiHelper.get('http://'+host+':3000/create-ldap-instance?env=stacks')
  .then((data:any) => {
    console.log('Response:', data);
    this.displayResponse(data)
  })
  .catch((error) => {
    this.displayResponse(error)
    console.error('Error:', error);
  });
  }

  updateClient(): void {
    const host = '10.150.4.245';
    const localhost = 'localhost';
    this.apiHelper.get('http://'+host+':3000/update-client')
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
