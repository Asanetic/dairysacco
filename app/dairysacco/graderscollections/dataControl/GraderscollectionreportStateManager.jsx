
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultGraderscollectionreportStateDefaults = {

  //state management for list page
  graderscollectionreportListData : [],
  graderscollectionreportListPageCount : 1,
  graderscollectionreportLoading: true,  
  parentUseEffectKey : 'loadGraderscollectionreportList',
  localEventSignature: 'loadGraderscollectionreportList',
  graderscollectionreportQuerySearchStr: '',

  
  //for profile page
  gradersNode : {},
  graderscollectionreportActionStatus : 'add_graders',
  paramgraderscollectionreportUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  graderscollectionreportUptoken:'',
  graderscollectionreportNode : {},
  activeScrollId : 'GraderscollectionreportProfileTray',
  
  //dataScript
  graderscollectionreportCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useGraderscollectionreportState(overrides = {}) {
  const combinedDefaults = { ...defaultGraderscollectionreportStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

