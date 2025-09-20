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
export async function insertMilkcollections() {
 //console.log(`Form milk_collections insert sent `)

  return await mosyPostFormData({
    formId: 'milk_collections_profile_form',
    url: apiRoutes.milkcollections.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateMilkcollections() {

  //console.log(`Form milk_collections update sent `)

  return await mosyPostFormData({
    formId: 'milk_collections_profile_form',
    url: apiRoutes.milkcollections.base,
    method: 'POST',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateMilkcollectionsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('milk_collections_mosy_action');
 
 //console.log(`Form milk_collections submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_milk_collections') {

      actionMessage ='Record added succesfully!';

      result = await insertMilkcollections();
    }

    if (actionType === 'update_milk_collections') {

      actionMessage ='Record updated succesfully!';

      result = await updateMilkcollections();
    }

    if (result?.status === 'success') {
      
      const milk_collectionsUptoken = btoa(result.milk_collections_uptoken || '');

      //set id key
      setters.setMilkcollectionsUptoken(milk_collectionsUptoken);
      
      //update url with new milk_collectionsUptoken
      mosyUpdateUrlParam('milk_collections_uptoken', milk_collectionsUptoken)

      setters.setMilkcollectionsActionStatus('update_milk_collections')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: milk_collectionsUptoken,
        actionName : actionType,
        actionType : 'milk_collections_form_submission'
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


export async function initMilkcollectionsProfileData(rawQstr) {

  //add the following data in response
  const rawMutations = {
               
    _farmers_farmer_name_farmer_id : [],
          
    _graders_grader_name_grader_id : [],
    
    sms_mosy_action : [],
    
    sms_uptoken : [],
    
    collection_ref : [],
    
    generated_sms : [],

  }
  

  MosyNotify({message : 'Refreshing Milk Collections' , icon:'refresh', addTimer:false})

  const encodedMutations = btoa(JSON.stringify(rawMutations));

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.milkcollections.base,
      params: { 
      q: btoa(rawQstr),         
      mutations: encodedMutations,
      fullQ : true,
      aw : btoa(``),
      src : btoa(`initMilkcollectionsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('milkcollections Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching milkcollections data:', response.message);  // Handle error

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteMilkcollections(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.milkcollections.delete,
        params: { 
          _milk_collections_delete_record: (token), 
          },
      });

      console.log('Token DeleteMilkcollections '+token)
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


export async function getMilkcollectionsListData(qstr = "") {
   let fullWhere = true
  if(qstr=='')
  {
   fullWhere = false 
   qstr=btoa(``)
  }
  
  //add the following data in response
  const rawMutations = {
               
    _farmers_farmer_name_farmer_id : [],
          
    _graders_grader_name_grader_id : [],
    
    sms_mosy_action : [],
    
    sms_uptoken : [],
    
    collection_ref : [],
    
    generated_sms : [],

  }
  
  const encodedMutations = btoa(JSON.stringify(rawMutations));

  //manage pagination 
  const pageNo = mosyUrlParam('qmilk_collections_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.milkcollections.base,
      params: { 
        q: qstr, 
        mutations: encodedMutations,
        fullQ : fullWhere,
        pagination : `l:qmilk_collections_page:${recordsPerPage}:${pageNo}`,
        aw : btoa(`order by primkey desc`),
        src : btoa(`getMilkcollectionsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('milkcollections Data:', response.data);
      return response; // ✅ Return the data
    } else {
      console.log('Error fetching milkcollections data:', response);
      return []; // Safe fallback
    }
  } catch (err) {
    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadMilkcollectionsListData(customQueryStr, setters) {

    const gftMilkcollections = MosyFilterEngine('milk_collections', true);
    let finalFilterStr = btoa(gftMilkcollections);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setMilkcollectionsLoading(true);
    
    const milkcollectionsListData = await getMilkcollectionsListData(finalFilterStr);
    
    setters.setMilkcollectionsLoading(false)
    setters.setMilkcollectionsListData(milkcollectionsListData?.data)

    setters.setMilkcollectionsListPageCount(milkcollectionsListData?.page_count)


    return milkcollectionsListData

}
  
  
export async function milkcollectionsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const milkcollectionsTokenId = mosyUrlParam('milk_collections_uptoken');
    
    const deleteParam = mosyUrlParam('milk_collections_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedMilkcollectionsToken = '0';
    if (milkcollectionsTokenId) {
      
      decodedMilkcollectionsToken = atob(milkcollectionsTokenId); // Decode the record_id
      setters.setMilkcollectionsUptoken(milkcollectionsTokenId);
      setters.setMilkcollectionsActionStatus('update_milk_collections');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawMilkcollectionsQueryStr =`where primkey ='${decodedMilkcollectionsToken}'`
    if(customQueryStr!='')
    {
      // if no milk_collections_uptoken set , use customQueryStr
      if (!milkcollectionsTokenId) {
       rawMilkcollectionsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initMilkcollectionsProfileData(rawMilkcollectionsQueryStr)

    if(deleteParam){
      popDeleteDialog(milkcollectionsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setMilkcollectionsNode(finalProfileData)
    
    
}
  
  

export function InteprateMilkcollectionsEvent(data) {
     
  //console.log('🎯 Milkcollections Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_milk_collections){

    if(data?.profile)
    {
      const router = data?.router
      
      const url = data?.url

      router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setMilkcollectionsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('MilkcollectionsProfileTray')

    
    mosyUpdateUrlParam('milk_collections_uptoken', btoa(data?.token))
    
    }
  }

  if(childActionName.add_milk_collections){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add milk_collections `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('MilkcollectionsProfileTray')
      }
    }
     
  }

  if(childActionName.update_milk_collections){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update milk_collections `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('MilkcollectionsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_milk_collections){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../milkcollections/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteMilkcollections(deleteToken).then(data=>{
  
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
       deleteUrlParam('milk_collections_delete');
        
    }
  
  });

}