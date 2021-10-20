import { EventEmitter, Injectable } from '@angular/core';
import { config } from '../config/index.js';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configuration = config
  ee: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  getConfig()
  {
    return this.configuration
  }


  public toggleStep(step: any){
    this.ee.emit(step);
  }
}
