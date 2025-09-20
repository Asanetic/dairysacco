'use client';
//hive / data utils
import { mosyPostFormData, mosyGetData, mosyUrlParam, mosyUpdateUrlParam , deleteUrlParam, magicRandomStr, mosyGetLSData  } from '../../../MosyUtils/hiveUtils';

//action modals 
import { MosyNotify , closeMosyModal, MosyAlertCard } from '../../../MosyUtils/ActionModals';

//filter util
import { MosyFilterEngine } from '../../DataControl/MosyFilterEngine';

//custom event manager 
import { customEventHandler } from '../../DataControl/customDataFunction';

//routes manager
///handle routes 
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();

//insert data
export async function insertFarmers() {
 //console.log(`Form farmers insert sent `)

  return await mosyPostFormData({
    formId: 'farmers_profile_form',
    url: apiRoutes.farmers.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateFarmers() {

  //console.log(`Form farmers update sent `)

  return await mosyPostFormData({
    formId: 'farmers_profile_form',
    url: apiRoutes.farmers.base,
    method: 'POST',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateFarmersFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('farmers_mosy_action');
 
 //console.log(`Form farmers submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_farmers') {

      actionMessage ='Record added succesfully!';

      result = await insertFarmers();
    }

    if (actionType === 'update_farmers') {

      actionMessage ='Record updated succesfully!';

      result = await updateFarmers();
    }

    if (result?.status === 'success') {
      
      const farmersUptoken = btoa(result.farmers_uptoken || '');

      //set id key
      setters.setFarmersUptoken(farmersUptoken);
      
      //update url with new farmersUptoken
      mosyUpdateUrlParam('farmers_uptoken', farmersUptoken)

      setters.setFarmersActionStatus('update_farmers')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: farmersUptoken,
        actionName : actionType,
        actionType : 'farmers_form_submission'
      };
            
      
    } else {
      MosyNotify({message:"A small error occured. Kindly try again", iconColor :'text-danger'})
      
      return {
        status: 'error',
        message: result,
        actionName: actionType,
        newToken: null
      };
      
    }

  } catch (error) {
    console.error('Form error:', error);
    
    MosyNotify({message:`A small error occured.  ${error}`, iconColor :'text-danger'})
    
      return {
        status: 'error',
        message: result,
        actionName: actionType,
        newToken: null
      };
      
  } 
}


export async function initFarmersProfileData(rawQstr) {

  //add the following data in response
  const rawMutations = {
     
  }
  

  MosyNotify({message : 'Refreshing Farmers' , icon:'refresh', addTimer:false})

  const encodedMutations = btoa(JSON.stringify(rawMutations));

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.farmers.base,
      params: { 
      q: btoa(rawQstr),         
      mutations: encodedMutations,
      fullQ : true,
      aw : btoa(``),
      src : btoa(`initFarmersProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('farmers Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching farmers data:', response.message);  // Handle error

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteFarmers(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.farmers.delete,
        params: { 
          _farmers_delete_record: (token), 
          },
      });

      console.log('Token DeleteFarmers '+token)
      if (response.status === 'success') {

        closeMosyModal();

        return response.data; // ✅ Return the data
      } else {
        console.error('Error deleting systemusers data:', response.message);
        closeMosyModal();
        
        return []; // Safe fallback
      }
    } catch (err) {
      console.error('Error:', err);
      closeMosyModal();
      
      return []; //  Even safer fallback
    }

}


export async function getFarmersListData(qstr = "") {
   let fullWhere = true
  if(qstr=='')
  {
   fullWhere = false 
   qstr=btoa(``)
  }
  
  //add the following data in response
  const rawMutations = {
     
  }
  
  const encodedMutations = btoa(JSON.stringify(rawMutations));

  //manage pagination 
  const pageNo = mosyUrlParam('qfarmers_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.farmers.base,
      params: { 
        q: qstr, 
        mutations: encodedMutations,
        fullQ : fullWhere,
        pagination : `l:qfarmers_page:${recordsPerPage}:${pageNo}`,
        aw : btoa(`order by primkey desc`),
        src : btoa(`getFarmersListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('farmers Data:', response.data);
      return response; // ✅ Return the data
    } else {
      console.log('Error fetching farmers data:', response);
      return []; // Safe fallback
    }
  } catch (err) {
    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadFarmersListData(customQueryStr, setters) {

    const gftFarmers = MosyFilterEngine('farmers', true);
    let finalFilterStr = btoa(gftFarmers);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setFarmersLoading(true);
    
    const farmersListData = await getFarmersListData(finalFilterStr);
    
    setters.setFarmersLoading(false)
    setters.setFarmersListData(farmersListData?.data)

    setters.setFarmersListPageCount(farmersListData?.page_count)


    return farmersListData

}
  
  
export async function farmersProfileData(customQueryStr, setters, router, customProfileData={}) {

    const farmersTokenId = mosyUrlParam('farmers_uptoken');
    
    const deleteParam = mosyUrlParam('farmers_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedFarmersToken = '0';
    if (farmersTokenId) {
      
      decodedFarmersToken = atob(farmersTokenId); // Decode the record_id
      setters.setFarmersUptoken(farmersTokenId);
      setters.setFarmersActionStatus('update_farmers');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawFarmersQueryStr =`where primkey ='${decodedFarmersToken}'`
    if(customQueryStr!='')
    {
      // if no farmers_uptoken set , use customQueryStr
      if (!farmersTokenId) {
       rawFarmersQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initFarmersProfileData(rawFarmersQueryStr)

    if(deleteParam){
      popDeleteDialog(farmersTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setFarmersNode(finalProfileData)
    
    
}
  
  

export function InteprateFarmersEvent(data) {
     
  //console.log('🎯 Farmers Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_farmers){

    if(data?.profile)
    {
      const router = data?.router
      
      const url = data?.url

      router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setFarmersCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('FarmersProfileTray')

    
    mosyUpdateUrlParam('farmers_uptoken', btoa(data?.token))
    
    }
  }

  if(childActionName.add_farmers){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add farmers `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('FarmersProfileTray')
      }
    }
     
  }

  if(childActionName.update_farmers){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update farmers `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('FarmersProfileTray')
        
      }
    }
  }

  if(childActionName.delete_farmers){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../farmers/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteFarmers(deleteToken).then(data=>{
  
        childSetters?.setSnackMessage("Record deleted succesfully!")
        childSetters?.setParentUseEffectKey(magicRandomStr());
        childSetters?.setLocalEventSignature(magicRandomStr());

        if(router){
          router.push(`${afterDeleteUrl}?snack_alert=Record Deleted successfully!`)
        }
                  
      })
  
    },
  
    onNo: () => {
  
      // Remove the param from the URL
       closeMosyModal()
       deleteUrlParam('farmers_delete');
        
    }
  
  });

}