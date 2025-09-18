
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {FarmerscollectionhistoryRowMutations} from './FarmerscollectionhistoryRowMutations';

import listFarmerscollectionhistoryRowMutationsKeys from './FarmerscollectionhistoryMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddFarmerscollectionhistory, UpdateFarmerscollectionhistory } from './FarmerscollectionhistoryDbGateway';


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
      tbl: 'farmers',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('farmers', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('farmers', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listFarmerscollectionhistoryRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, FarmerscollectionhistoryRowMutations);

      return Response.json({
        status: 'success',
        message: 'Farmerscollectionhistory data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Farmerscollectionhistory failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(FarmerscollectionhistoryRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = FarmerscollectionhistoryRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await FarmerscollectionhistoryRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await FarmerscollectionhistoryRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(FarmerscollectionhistoryRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const FarmerscollectionhistoryFormAction = body.farmers_mosy_action;
    const farmers_uptoken_value = base64Decode(body.farmers_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  farmers inputs array ---// 
  const FarmerscollectionhistoryInputsArr = {

    "farmer_name" : "?", 
    "farmer_number" : "?", 
    "phone" : "?", 
    "location" : "?", 
    "date_registered" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End farmers inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('farmers',FarmerscollectionhistoryInputsArr, FarmerscollectionhistoryRequest, newId, authData)

    if (FarmerscollectionhistoryFormAction === "add_farmers") 
    {
      
      mutatedDataArray.farmer_id = newId;
      
      // Insert into table Farmerscollectionhistory
      const result = await AddFarmerscollectionhistory(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        farmers_uptoken: result.record_id
      });
      
    }
    
    if (FarmerscollectionhistoryFormAction === "update_farmers") {
      
      // update table Farmerscollectionhistory
      const result = await UpdateFarmerscollectionhistory(newId, mutatedDataArray, body, authData, `primkey='${farmers_uptoken_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        farmers_uptoken: farmers_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${FarmerscollectionhistoryFormAction}`
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