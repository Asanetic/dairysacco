
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultFarmersStateDefaults = {

  //state management for list page
  farmersListData : [],
  farmersListPageCount : 1,
  farmersLoading: true,  
  parentUseEffectKey : 'loadFarmersList',
  localEventSignature: 'loadFarmersList',
  farmersQuerySearchStr: '',

  
  //for profile page
  farmersNode : {},
  farmersActionStatus : 'add_farmers',
  paramfarmersUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  farmersUptoken:'',
  farmersNode : {},
  activeScrollId : 'FarmersProfileTray',
  
  //dataScript
  farmersCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useFarmersState(overrides = {}) {
  const combinedDefaults = { ...defaultFarmersStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

