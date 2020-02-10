import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor() { }

  getOngoingTransactionCount(): number {
    return 18;
  }

  getRegisteredNotaryCount(): number {
    return 3012;
  }

  getLandsCount(): number {
    return 30120;
  }
  
}
