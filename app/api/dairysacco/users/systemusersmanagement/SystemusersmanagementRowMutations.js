
import { base64Decode, mosyFlexSelect , mosyQddata, mosySumRows, mosyCountRows , mosyQuickSel, mosyFlexQuickSel} from '../../../apiUtils/dataControl/dataUtils';

//computed column mutations for Systemusersmanagement 
export const SystemusersmanagementRowMutations = {

  
  //dope last_seen column to the response              
  last_seen: async (row) => {

    const data_res = await mosyGetRow('system_users', `last_seen`, `where user_id ='${row?.user_id}'`);

    return data_res?.last_seen;

  }
}
