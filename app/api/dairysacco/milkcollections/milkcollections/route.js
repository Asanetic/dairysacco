
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {MilkcollectionsRowMutations} from './MilkcollectionsRowMutations';

import listMilkcollectionsRowMutationsKeys from './MilkcollectionsMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddMilkcollections, UpdateMilkcollections } from './MilkcollectionsDbGateway';


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
      tbl: 'milk_collections',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('milk_collections', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('milk_collections', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listMilkcollectionsRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, MilkcollectionsRowMutations);

      return Response.json({
        status: 'success',
        message: 'Milkcollections data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Milkcollections failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(MilkcollectionsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = MilkcollectionsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await MilkcollectionsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await MilkcollectionsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(MilkcollectionsRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const MilkcollectionsFormAction = body.milk_collections_mosy_action;
    const milk_collections_uptoken_value = base64Decode(body.milk_collections_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  milk_collections inputs array ---// 
  const MilkcollectionsInputsArr = {

    "collection_date" : "?", 
    "session" : "?", 
    "quantity_litres" : "?", 
    "farmer_id" : "?", 
    "grader_id" : "?", 
    "society_id" : "?", 
    "remarks" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "recipient_phone" : "?", 
    "message_body" : "?", 
    "delivery_report" : "?", 
    "status" : "?", 

  };

  //--- End milk_collections inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('milk_collections',MilkcollectionsInputsArr, MilkcollectionsRequest, newId, authData)

    if (MilkcollectionsFormAction === "add_milk_collections") 
    {
      
      mutatedDataArray.collection_id = newId;
      
      // Insert into table Milkcollections
      const result = await AddMilkcollections(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        milk_collections_uptoken: result.record_id
      });
      
    }
    
    if (MilkcollectionsFormAction === "update_milk_collections") {
      
      // update table Milkcollections
      const result = await UpdateMilkcollections(newId, mutatedDataArray, body, authData, `primkey='${milk_collections_uptoken_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        milk_collections_uptoken: milk_collections_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${MilkcollectionsFormAction}`
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