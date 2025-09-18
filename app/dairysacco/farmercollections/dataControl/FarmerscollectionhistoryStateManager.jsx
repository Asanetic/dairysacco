
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultFarmerscollectionhistoryStateDefaults = {

  //state management for list page
  farmerscollectionhistoryListData : [],
  farmerscollectionhistoryListPageCount : 1,
  farmerscollectionhistoryLoading: true,  
  parentUseEffectKey : 'loadFarmerscollectionhistoryList',
  localEventSignature: 'loadFarmerscollectionhistoryList',
  farmerscollectionhistoryQuerySearchStr: '',

  
  //for profile page
  farmersNode : {},
  farmerscollectionhistoryActionStatus : 'add_farmers',
  paramfarmerscollectionhistoryUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  farmerscollectionhistoryUptoken:'',
  farmerscollectionhistoryNode : {},
  activeScrollId : 'FarmerscollectionhistoryProfileTray',
  
  //dataScript
  farmerscollectionhistoryCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useFarmerscollectionhistoryState(overrides = {}) {
  const combinedDefaults = { ...defaultFarmerscollectionhistoryStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

