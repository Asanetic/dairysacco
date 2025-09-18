
import { mosySqlDelete , base64Decode , mosyQddata , mosyDeleteFile } from '../../../apiUtils/dataControl/dataUtils';

import { DeleteMilkcollections } from '../milkcollections/MilkcollectionsDbGateway';

export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const deleteToken = searchParams.get('_milk_collections_delete_record');
  const deleteTokenDecode = base64Decode(deleteToken);

  if (deleteToken) {
    // 👇 Customize table and WHERE clause here
    const table = 'milk_collections'; // Replace with your actual table
    
     
    
    const whereStr = `WHERE primkey = '${deleteTokenDecode}'`;

    const res = await DeleteMilkcollections(deleteTokenDecode, whereStr);

    if (res.status === 'success') {
      return Response.json({ status: 'success', rowsAffected: res.affectedRows });
    } else {
      return Response.json({ status: 'error', message: res.message }, { status: 500 });
    }
  }

  return Response.json({ status: 'idle', message: 'No action performed' });
  
}