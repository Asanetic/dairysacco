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
import apiRoutes from '../../AppRoutes/apiRoutes.json'


//insert data
export async function insertGradersmanagement() {
 //console.log(`Form graders insert sent `)

  return await mosyPostFormData({
    formId: 'graders_profile_form',
    url: apiRoutes.gradersmanagement.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateGradersmanagement() {

  //console.log(`Form graders update sent `)

  return await mosyPostFormData({
    formId: 'graders_profile_form',
    url: apiRoutes.gradersmanagement.base,
    method: 'POST',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateGradersmanagementFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('graders_mosy_action');
 
 //console.log(`Form graders submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_graders') {

      actionMessage ='Record added succesfully!';

      result = await insertGradersmanagement();
    }

    if (actionType === 'update_graders') {

      actionMessage ='Record updated succesfully!';

      result = await updateGradersmanagement();
    }

    if (result?.status === 'success') {
      
      const gradersUptoken = btoa(result.graders_uptoken || '');

      //set id key
      setters.setGradersmanagementUptoken(gradersUptoken);
      
      //update url with new gradersUptoken
      mosyUpdateUrlParam('graders_uptoken', gradersUptoken)

      setters.setGradersmanagementActionStatus('update_graders')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: gradersUptoken,
        actionName : actionType,
        actionType : 'graders_form_submission'
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


export async function initGradersmanagementProfileData(rawQstr) {

  //add the following data in response
  const rawMutations = {
     
  }
  

  MosyNotify({message : 'Refreshing Graders Management' , icon:'refresh', addTimer:false})

  const encodedMutations = btoa(JSON.stringify(rawMutations));

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.gradersmanagement.base,
      params: { 
      q: btoa(rawQstr),         
      mutations: encodedMutations,
      fullQ : true,
      aw : btoa(``),
      src : btoa(`initGradersmanagementProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('graders Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching graders data:', response.message);  // Handle error

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteGradersmanagement(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.gradersmanagement.delete,
        params: { 
          _graders_delete_record: (token), 
          },
      });

      console.log('Token DeleteGradersmanagement '+token)
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


export async function getGradersmanagementListData(qstr = "") {
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
  const pageNo = mosyUrlParam('qgraders_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.gradersmanagement.base,
      params: { 
        q: qstr, 
        mutations: encodedMutations,
        fullQ : fullWhere,
        pagination : `l:qgraders_page:${recordsPerPage}:${pageNo}`,
        aw : btoa(`order by primkey desc`),
        src : btoa(`getGradersmanagementListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('graders Data:', response.data);
      return response; // ✅ Return the data
    } else {
      console.log('Error fetching graders data:', response);
      return []; // Safe fallback
    }
  } catch (err) {
    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadGradersmanagementListData(customQueryStr, setters) {

    const gftGradersmanagement = MosyFilterEngine('graders', true);
    let finalFilterStr = btoa(gftGradersmanagement);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setGradersmanagementLoading(true);
    
    const gradersmanagementListData = await getGradersmanagementListData(finalFilterStr);
    
    setters.setGradersmanagementLoading(false)
    setters.setGradersmanagementListData(gradersmanagementListData?.data)

    setters.setGradersmanagementListPageCount(gradersmanagementListData?.page_count)


    return gradersmanagementListData

}
  
  
export async function gradersmanagementProfileData(customQueryStr, setters, router, customProfileData={}) {

    const gradersmanagementTokenId = mosyUrlParam('graders_uptoken');
    
    const deleteParam = mosyUrlParam('graders_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedGradersmanagementToken = '0';
    if (gradersmanagementTokenId) {
      
      decodedGradersmanagementToken = atob(gradersmanagementTokenId); // Decode the record_id
      setters.setGradersmanagementUptoken(gradersmanagementTokenId);
      setters.setGradersmanagementActionStatus('update_graders');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawGradersmanagementQueryStr =`where primkey ='${decodedGradersmanagementToken}'`
    if(customQueryStr!='')
    {
      // if no graders_uptoken set , use customQueryStr
      if (!gradersmanagementTokenId) {
       rawGradersmanagementQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initGradersmanagementProfileData(rawGradersmanagementQueryStr)

    if(deleteParam){
      popDeleteDialog(gradersmanagementTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setGradersmanagementNode(finalProfileData)
    
    
}
  
  

export function InteprateGradersmanagementEvent(data) {
     
  //console.log('🎯 Gradersmanagement Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_graders){

    if(data?.profile)
    {
      const router = data?.router
      
      const url = data?.url

      router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setGradersmanagementCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('GradersmanagementProfileTray')

    
    mosyUpdateUrlParam('graders_uptoken', btoa(data?.token))
    
    }
  }

  if(childActionName.add_graders){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add graders `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('GradersmanagementProfileTray')
      }
    }
     
  }

  if(childActionName.update_graders){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update graders `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('GradersmanagementProfileTray')
        
      }
    }
  }

  if(childActionName.delete_graders){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../graders/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteGradersmanagement(deleteToken).then(data=>{
  
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
       deleteUrlParam('graders_delete');
        
    }
  
  });

}