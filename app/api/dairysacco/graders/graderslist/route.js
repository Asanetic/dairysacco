
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {GraderslistRowMutations} from './GraderslistRowMutations';

import listGraderslistRowMutationsKeys from './GraderslistMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddGraderslist, UpdateGraderslist } from './GraderslistDbGateway';


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
      tbl: 'graders',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('graders', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('graders', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listGraderslistRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, GraderslistRowMutations);

      return Response.json({
        status: 'success',
        message: 'Graderslist data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Graderslist failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(GraderslistRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = GraderslistRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await GraderslistRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await GraderslistRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(GraderslistRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const GraderslistFormAction = body.graders_mosy_action;
    const graders_uptoken_value = base64Decode(body.graders_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  graders inputs array ---// 
  const GraderslistInputsArr = {

    "grader_name" : "?", 
    "phone" : "?", 
    "society_id" : "?", 
    "date_registered" : "?", 
    "username" : "?", 
    "password" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End graders inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('graders',GraderslistInputsArr, GraderslistRequest, newId, authData)

    if (GraderslistFormAction === "add_graders") 
    {
      
      mutatedDataArray.grader_id = newId;
      
      // Insert into table Graderslist
      const result = await AddGraderslist(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        graders_uptoken: result.record_id
      });
      
    }
    
    if (GraderslistFormAction === "update_graders") {
      
      // update table Graderslist
      const result = await UpdateGraderslist(newId, mutatedDataArray, body, authData, `primkey='${graders_uptoken_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        graders_uptoken: graders_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${GraderslistFormAction}`
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