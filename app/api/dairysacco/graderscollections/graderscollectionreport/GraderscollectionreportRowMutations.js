
import { base64Decode, mosyFlexSelect , mosyQddata, mosySumRows, mosyCountRows , mosyQuickSel, mosyFlexQuickSel} from '../../../apiUtils/dataControl/dataUtils';

//computed column mutations for Graderscollectionreport 
export const GraderscollectionreportRowMutations = {

  
  //dope collection_history column to the response              
  collection_history: async (row) => {

    const data_res = await mosyFlexQuickSel('milk_collections', `collection_date, quantity_litres, collection_id, session, farmer_name`, ` inner join farmers on milk_collections.farmer_id=farmers.farmer_id where grader_id ='${row?.grader_id}'`);
;

    return data_res;

  }
}
