
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {MyaccountRowMutations} from './MyaccountRowMutations';

import listMyaccountRowMutationsKeys from './MyaccountMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddMyaccount, UpdateMyaccount } from './MyaccountDbGateway';


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
      tbl: 'system_users',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('system_users', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('system_users', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listMyaccountRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, MyaccountRowMutations);

      return Response.json({
        status: 'success',
        message: 'Myaccount data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Myaccount failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(MyaccountRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = MyaccountRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await MyaccountRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await MyaccountRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(MyaccountRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const MyaccountFormAction = body.system_users_mosy_action;
    const system_users_uptoken_value = base64Decode(body.system_users_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  system_users inputs array ---// 
  const MyaccountInputsArr = {

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

    //mutate requested values
    const mutatedDataArray =mutateInputArray('system_users',MyaccountInputsArr, MyaccountRequest, newId, authData)

    if (MyaccountFormAction === "add_system_users") 
    {
      
      mutatedDataArray.user_id = newId;
      
      // Insert into table Myaccount
      const result = await AddMyaccount(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        system_users_uptoken: result.record_id
      });
      
    }
    
    if (MyaccountFormAction === "update_system_users") {
      
      // update table Myaccount
      const result = await UpdateMyaccount(newId, mutatedDataArray, body, authData, `primkey='${system_users_uptoken_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        system_users_uptoken: system_users_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${MyaccountFormAction}`
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