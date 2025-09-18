
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultMilkcollectionsStateDefaults = {

  //state management for list page
  milkcollectionsListData : [],
  milkcollectionsListPageCount : 1,
  milkcollectionsLoading: true,  
  parentUseEffectKey : 'loadMilkcollectionsList',
  localEventSignature: 'loadMilkcollectionsList',
  milkcollectionsQuerySearchStr: '',

  
  //for profile page
  milk_collectionsNode : {},
  milkcollectionsActionStatus : 'add_milk_collections',
  parammilkcollectionsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  milkcollectionsUptoken:'',
  milkcollectionsNode : {},
  activeScrollId : 'MilkcollectionsProfileTray',
  
  //dataScript
  milkcollectionsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useMilkcollectionsState(overrides = {}) {
  const combinedDefaults = { ...defaultMilkcollectionsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

