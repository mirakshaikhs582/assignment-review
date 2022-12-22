import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private htttp:HttpClient) { }

apiCall(req:any) {
  return this.htttp.get(req)
}
 
}
