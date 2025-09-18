
import { base64Decode, mosyFlexSelect , mosyQddata, mosySumRows, mosyCountRows , mosyQuickSel, mosyFlexQuickSel} from '../../../apiUtils/dataControl/dataUtils';

//computed column mutations for Milkcollections 
export const MilkcollectionsRowMutations = {

  //dope  _farmers_farmer_name_farmer_id column to the response
  _farmers_farmer_name_farmer_id : async (row)=>{

    const data_res = await mosyQddata("farmers", "farmer_id", row.farmer_id);
    return data_res?.farmer_name ?? row.farmer_id;

  },

  //dope  _graders_grader_name_grader_id column to the response
  _graders_grader_name_grader_id : async (row)=>{

    const data_res = await mosyQddata("graders", "grader_id", row.grader_id);
    return data_res?.grader_name ?? row.grader_id;

  },

  
  //dope sms_mosy_action column to the response              
  sms_mosy_action: async (row) => {

    const data_res = {};

    return `add_sms`;

  },

  
  //dope sms_uptoken column to the response              
  sms_uptoken: async (row) => {

    const data_res = {};

    return `0`;

  },

  
  //dope collection_ref column to the response              
  collection_ref: async (row) => {

    const data_res = {};

    return row?.collection_id;

  },

  
  //dope generated_sms column to the response              
  generated_sms: async (row) => {

    const data_res = {};

    return row?.message_body;

  }
}
