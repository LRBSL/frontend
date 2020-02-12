import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/shared/services/blockchain.service';

@Component({
  selector: 'app-search-information',
  templateUrl: './search-information.component.html',
  styleUrls: ['./search-information.component.css']
})
export class SearchInformationComponent implements OnInit {

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.blockchainService.getLandByID("0000000").subscribe((result) => {
      console.log(result);
    });
    this.blockchainService.getAllLands().subscribe((result) => {
      console.log(result);
    })
  }

}
