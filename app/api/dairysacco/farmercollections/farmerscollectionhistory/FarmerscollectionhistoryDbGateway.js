
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert farmers 
export async function AddFarmerscollectionhistory(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("farmers", mutatedDataArray, body);
   
  return result;
}


//update farmers 
export async function UpdateFarmerscollectionhistory(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("farmers", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete farmers 
export async function DeleteFarmerscollectionhistory(tokenId, whereStr)
{  
  const result = await mosySqlDelete("farmers", whereStr);

  return result;
}

