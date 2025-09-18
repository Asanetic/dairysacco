
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert milk_collections 
export async function AddMilkcollections(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("milk_collections", mutatedDataArray, body);
   
  return result;
}


//update milk_collections 
export async function UpdateMilkcollections(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("milk_collections", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete milk_collections 
export async function DeleteMilkcollections(tokenId, whereStr)
{  
  const result = await mosySqlDelete("milk_collections", whereStr);

  return result;
}

