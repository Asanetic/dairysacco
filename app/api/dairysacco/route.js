
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {RowMutations} from './RowMutations';

import listRowMutationsKeys from './MutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { Add, Update } from './DbGateway';


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const encodedMutations = searchParams.get('mutations');

    let requestedMutationsObj = {};
    if (encodedMutations) {
      try {
        const decodedMutations = Buffer.from(encodedMutations, 'base64').toString('utf-8');
        requestedMutationsObj = JSON.parse(decodedMutations);
      } catch (err) {
        console.error('Mutation decode failed:', err);
      }
    }

    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    

    // ✅ Provide default fallbacks
    const enhancedParams = {
      tbl: 'user_manifest_',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('user_manifest_', searchParams, authData, '')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('user_manifest_', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, RowMutations);

      return Response.json({
        status: 'success',
        message: ' data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET  failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(Request) {
  try {
    let body;
    let isMultipart = false;

    const contentType = Request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await Request.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await Request.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(Request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const FormAction = body.user_manifest__mosy_action;
    const user_manifest__uptoken_value = base64Decode(body.user_manifest__uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  farmers inputs array ---// 
  const InputsArr = {

    "farmer_name" : "?", 
    "farmer_number" : "?", 
    "phone" : "?", 
    "location" : "?", 
    "date_registered" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End farmers inputs array --//

  
  //--- Begin  graders inputs array ---// 
  const InputsArr = {

    "grader_name" : "?", 
    "phone" : "?", 
    "society_id" : "?", 
    "date_registered" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "password" : "?", 
    "username" : "?", 

  };

  //--- End graders inputs array --//

  
  //--- Begin  milk_collections inputs array ---// 
  const InputsArr = {

    "farmer_id" : "?", 
    "grader_id" : "?", 
    "society_id" : "?", 
    "collection_date" : "?", 
    "session" : "?", 
    "quantity_litres" : "?", 
    "remarks" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "recipient_phone" : "?", 
    "message_body" : "?", 
    "delivery_report" : "?", 
    "status" : "?", 

  };

  //--- End milk_collections inputs array --//

  
  //--- Begin  page_manifest_ inputs array ---// 
  const InputsArr = {

    "page_group" : "?", 
    "site_id" : "?", 
    "page_url" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "project_id" : "?", 
    "project_name" : "?", 

  };

  //--- End page_manifest_ inputs array --//

  
  //--- Begin  sms inputs array ---// 
  const InputsArr = {

    "recipient_phone" : "?", 
    "message_body" : "?", 
    "status" : "?", 
    "sent_at" : "?", 
    "delivery_report" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End sms inputs array --//

  
  //--- Begin  system_role_bundles inputs array ---// 
  const InputsArr = {

    "bundle_id" : "?", 
    "bundle_name" : "?", 
    "remark" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End system_role_bundles inputs array --//

  
  //--- Begin  system_users inputs array ---// 
  const InputsArr = {

    "user_id" : "?", 
    "name" : "?", 
    "email" : "?", 
    "tel" : "?", 
    "ref_id" : "?", 
    "regdate" : "?", 
    "user_no" : "?", 
    "user_pic" : "?", 
    "user_gender" : "?", 
    "last_seen" : "?", 
    "about" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "auth_token" : "?", 
    "token_status" : "?", 
    "token_expiring_in" : "?", 
    "project_id" : "?", 
    "project_name" : "?", 

  };

  //--- End system_users inputs array --//

  
  //--- Begin  user_bundle_role_functions inputs array ---// 
  const InputsArr = {

    "bundle_id" : "?", 
    "bundle_name" : "?", 
    "role_id" : "?", 
    "role_name" : "?", 
    "remark" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End user_bundle_role_functions inputs array --//

  
  //--- Begin  user_manifest_ inputs array ---// 
  const InputsArr = {

    "user_id" : "?", 
    "user_name" : "?", 
    "role_id" : "?", 
    "site_id" : "?", 
    "role_name" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "project_id" : "?", 
    "project_name" : "?", 

  };

  //--- End user_manifest_ inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('user_manifest_',InputsArr, Request, newId, authData)

    if (FormAction === "add_user_manifest_") 
    {
      
      mutatedDataArray. = newId;
      
      // Insert into table 
      const result = await Add(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        user_manifest__uptoken: result.record_id
      });
      
    }
    
    if (FormAction === "update_user_manifest_") {
      
      // update table 
      const result = await Update(newId, mutatedDataArray, body, authData, `='${user_manifest__uptoken_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        user_manifest__uptoken: user_manifest__uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${FormAction}`
    }, { status: 400 });

  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}