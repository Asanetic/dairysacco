
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultGradersmanagementStateDefaults = {

  //state management for list page
  gradersmanagementListData : [],
  gradersmanagementListPageCount : 1,
  gradersmanagementLoading: true,  
  parentUseEffectKey : 'loadGradersmanagementList',
  localEventSignature: 'loadGradersmanagementList',
  gradersmanagementQuerySearchStr: '',

  
  //for profile page
  gradersNode : {},
  gradersmanagementActionStatus : 'add_graders',
  paramgradersmanagementUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  gradersmanagementUptoken:'',
  gradersmanagementNode : {},
  activeScrollId : 'GradersmanagementProfileTray',
  
  //dataScript
  gradersmanagementCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useGradersmanagementState(overrides = {}) {
  const combinedDefaults = { ...defaultGradersmanagementStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

