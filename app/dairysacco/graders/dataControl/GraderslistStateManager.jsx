
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultGraderslistStateDefaults = {

  //state management for list page
  graderslistListData : [],
  graderslistListPageCount : 1,
  graderslistLoading: true,  
  parentUseEffectKey : 'loadGraderslistList',
  localEventSignature: 'loadGraderslistList',
  graderslistQuerySearchStr: '',

  
  //for profile page
  gradersNode : {},
  graderslistActionStatus : 'add_graders',
  paramgraderslistUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  graderslistUptoken:'',
  graderslistNode : {},
  activeScrollId : 'GraderslistProfileTray',
  
  //dataScript
  graderslistCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useGraderslistState(overrides = {}) {
  const combinedDefaults = { ...defaultGraderslistStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

