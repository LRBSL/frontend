import { Injectable } from '@angular/core';
import { HttpResolverService } from './http-resolver.service';
import { BackendURLS } from '../utils/backend-urls.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor(private httpResolverService: HttpResolverService, private authServie: AuthService) { }

  getOngoingTransactionCount(): number {
    return 18;
  }

  getRegisteredNotaryCount(): number {
    return 3012;
  }

  getLandsCount(): number {
    return 30120;
  }

  getLandByID(id: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.blockchain_query_land, { id: id }
    );
  }

  getAllLands() {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.blockchain_query_all_lands, {}
    );
  }

  getLandIdByKeyAndNic(nic: string, key: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.land_get_id_by_key_nic, { nic: nic, key: key }
    );
  }

  getDeedByLandId(landId: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.land_get_deed, { landId: landId }
    );
  }

  // ----------------------------------------------------
  ownerVerification(nicNo: string, key: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.land_owner_verification, { userId: this.authServie.currentUser.id, nic: nicNo, key: key }
    );
  }

  getHistoryForLand(id: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.land_get_history, { userId: this.authServie.currentUser.id, id: id }
    );
  }

  buyerVerification(nicNo: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.land_buyer_verification, { nic: nicNo }
    );
  }

  changeNotaryVote(newNicNo: string, id: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.land_change_notary_vote, { userId: this.authServie.currentUser.id, id: id, newNicNo: newNicNo }
    );
  }

}
