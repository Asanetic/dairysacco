
import { base64Decode, mosyFlexSelect , mosyQddata, mosySumRows, mosyCountRows , mosyQuickSel, mosyFlexQuickSel} from '../../../apiUtils/dataControl/dataUtils';

//computed column mutations for Farmerscollectionhistory 
export const FarmerscollectionhistoryRowMutations = {

  
  //dope collection_history column to the response              
  collection_history: async (row) => {

    const data_res = await mosyFlexQuickSel('milk_collections', `collection_date, quantity_litres, collection_id, session`, `where farmer_id ='${row?.farmer_id}'`);
;

    return data_res;

  }
}
