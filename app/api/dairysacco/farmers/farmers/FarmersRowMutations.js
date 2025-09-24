
import { base64Decode, mosyFlexSelect , mosyQddata, mosySumRows, mosyCountRows , mosyQuickSel, mosyFlexQuickSel} from '../../../apiUtils/dataControl/dataUtils';

//computed column mutations for Farmers 
export const FarmersRowMutations = {

  //dope  _graders_grader_name_grader_id column to the response
  _graders_grader_name_grader_id : async (row)=>{

    const data_res = await mosyQddata("graders", "grader_id", row.grader_id);
    return data_res?.grader_name ?? row.grader_id;

  }
}
