export interface DUsers {
  id?: string,
  email?: string,
  password?: string,
  fname?: string,
  lname?: string,
  nic?: string,
  address?: string,
  contact?: string,
  regId?: string,
  regDate?: string,
  type?: string,
  createdAt?: string,
  updatedAt?: string
}

export interface OnGoTr {
  status?: boolean,
  txId?: string,
  landId?: string,
  trType?: string,
  rlregistry?: string,
  notary?: string,
  surveyor?: string,
  currentOwner?: string,
  requestNewOwner?: string
}

export interface LandInformation {
  id?: string,
  rlregistry?: string,
  current_owner_nic?: string,
  extent?: string,
  boundaries?: number[][],
  notary_vote?: string
}

export interface OwnerInformation {
  nic_no?: string,
  name?: string,
  address?: string,
  sex?: string,
  regDate?: string
}

export interface DeedInformation {
  id?: string,
  type?: string,
  registeredNotary?: string,
  registeredAt?: string
}

export interface PlanInformation {
  id?: string,
  registeredSurveyor?: string,
  registeredAt?: string
}

export interface BuyerInformation {
  no?: string,
  name?: string,
  gender?: string,
  postalAddress?: string,
  registeredDate?: string
}

export const userList: DUsers[] = [
  { id: "xfda-1233-ad12-adas", email: "rlr.admin@gov.lk", password: "rlr.admin@gov.lk", type: "r"},
  { id: "gs4r-1313-ad12-4234", email: "notary.admin@gov.lk", password: "notary.admin@gov.lk", type: "n"},
  { id: "reew-1313-ad12-qweq", email: "notary.u1@gov.lk", password: "notary.u1@gov.lk", type: "n"},
  { id: "rtwt-42rq-ad12-fdsg", email: "notary.u2@gov.lk", password: "notary.u2@gov.lk", type: "n"},
  { id: "gs4r-1313-uduy-jkfj", email: "notary.u3@gov.lk", password: "notary.u3@gov.lk", type: "n"},
  { id: "dydd-1313-ad12-hfhf", email: "notary.u4@gov.lk", password: "notary.u4@gov.lk", type: "n"},
  { id: "asda-1313-ad12-hfhf", email: "surveyor.admin@gov.lk", password: "surveyor.admin@gov.lk", type: "s"}
]

export const onGoTrList: OnGoTr[] = [
  { status: true, txId: "tx1hb131hb1b31b-fds1-h1bjh1", landId: "LAND_001", trType: "owner-changing", 
  rlregistry: "colombo-01", notary: "NOTARY_001", surveyor: "SUR_001", currentOwner: "123456789V", 
  requestNewOwner: "234567890V"}
]

export const landList: LandInformation[] = [
  {id: "LAND_001", rlregistry: "colombo-01", boundaries: [[0,0], [100,0], [100,100], [0,100]], 
  extent: "10000", current_owner_nic: "123456789V", notary_vote: "nill"}
]

export const ownerList: OwnerInformation[] = [
  {nic_no: "123456789V", name: "Thissa jayaweera", address: "32, Main rd, Ja-ela", 
  regDate: "2014-05-03", sex: "Male"}
]

export const deedList: DeedInformation[] = [
  {id: "khsf-1313-fsf1-23ds", type: "Gift", registeredNotary: "NOTARY_001", registeredAt: "2020-02-24"}
]

export const planList: PlanInformation[] = [
  {id: "dsfa-dsf1-sfg2-34gs", registeredSurveyor: "SUR_001", registeredAt: "2020-02-24"}
]

export const buyerList: BuyerInformation[] = [
  {no: "234567890V", name: "Aruna Jayasinghe", gender: "Male", postalAddress: "12, 2nd Street, Negombo", 
  registeredDate: "2015-12-12"}
]