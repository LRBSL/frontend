import { Component, OnInit, Inject } from '@angular/core';
import { OnGoTr, onGoTrList, LandInformation, OwnerInformation, DeedInformation, PlanInformation, landList, ownerList, deedList, planList } from 'src/app/shared/utils/data';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-search-information',
  templateUrl: './search-information.component.html',
  styleUrls: ['./search-information.component.css']
})
export class SearchInformationComponent implements OnInit {

  onGoTrs: OnGoTr[] = onGoTrList;

  landInformation: LandInformation = null;
  ownerInformation: OwnerInformation = null;
  deedInformation: DeedInformation = null;
  planInformation: PlanInformation = null;

  alert_type: string;
  alert_content: string;

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) {
    this.landInformation = {
      id: landList[0].id,
      rlregistry: landList[0].rlregistry,
      current_owner_nic: landList[0].current_owner_nic,
      extent: landList[0].extent,
      boundaries: landList[0].boundaries,
      notary_vote: landList[0].notary_vote
    };
    this.ownerInformation = {
      nic_no: ownerList[0].nic_no,
      name: ownerList[0].name,
      address: ownerList[0].address,
      sex: ownerList[0].sex,
      regDate: ownerList[0].regDate
    };
    this.deedInformation = {
      id: deedList[0].id,
      type: deedList[0].type,
      registeredNotary: deedList[0].registeredNotary,
      registeredAt: deedList[0].registeredAt
    }
    this.planInformation = {
      id: planList[0].id,
      registeredSurveyor: planList[0].registeredSurveyor,
      registeredAt: planList[0].registeredAt
    }
  }

  ngOnInit() {
    if (this.authService._currentAuthUser.email == 'notary.admin@gov.lk') {
      this.onGoTrs = [];
    }
  }

  confirmed() {
    this.alert_type = "success";
    this.alert_content = "Notary vote submitted";
    this.document.getElementById("openAlertBoxButton").click();
    this.onGoTrs = []
  }

  rejected() {
    this.alert_type = "success";
    this.alert_content = "Notary vote submitted";
    this.document.getElementById("openAlertBoxButton").click();
    this.onGoTrs = []
  }

}
