
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert farmers 
export async function AddFarmers(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("farmers", mutatedDataArray, body);
   
  return result;
}


//update farmers 
export async function UpdateFarmers(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("farmers", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete farmers 
export async function DeleteFarmers(tokenId, whereStr)
{  
  const result = await mosySqlDelete("farmers", whereStr);

  return result;
}

