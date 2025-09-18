
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert graders 
export async function AddGradersmanagement(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("graders", mutatedDataArray, body);
   
  return result;
}


//update graders 
export async function UpdateGradersmanagement(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("graders", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete graders 
export async function DeleteGradersmanagement(tokenId, whereStr)
{  
  const result = await mosySqlDelete("graders", whereStr);

  return result;
}

