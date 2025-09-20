'use client';

//React
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';


//components
import { MosyAlertCard, MosyNotify ,closeMosyModal } from  '../../../MosyUtils/ActionModals';
import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//basic utils
import { mosyScrollTo , deleteUrlParam, mosyFormInputHandler,mosyUrlParam } from '../../../MosyUtils/hiveUtils';

//data control and processors
import { inteprateMilkcollectionsFormAction, milkcollectionsProfileData , popDeleteDialog, InteprateMilkcollectionsEvent } from '../dataControl/MilkcollectionsRequestHandler';

//state management
import { useMilkcollectionsState } from '../dataControl/MilkcollectionsStateManager';

//profile components
import {
  SubmitButtons,
  AddNewButton,
  LiveSearchDropdown,
  MosySmartField,
  MosyActionButton,
  SmartDropdown,
  DeleteButton ,
  MosyImageViewer,
  MosyFileUploadButton
} from '../../UiControl/componentControl';

//def logo
import logo from '../../../img/logo/logo.png'; // outside public!

import MosyHtmlEditor from '../../../MosyUtils/htmlEditor'

///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();



//import MilkcollectionsList component
import MilkcollectionsList from '../../milkcollections/uiControl/MilkcollectionsList';

//button function imports
import { formartGradersMessage } from "../../AppCore/coreUtils";


// export profile


export default function MilkcollectionsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="MilkcollectionsMainProfilePage",
    parentProfileItemId = "MilkcollectionsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Milkcollections states
  const [stateItem, stateItemSetters] = useMilkcollectionsState(settersOverrides);
  const milk_collectionsNode = stateItem.milkcollectionsNode
  
  // -- basic states --//
  const paramMilkcollectionsUptoken  = stateItem.milkcollectionsUptoken
  const milkcollectionsActionStatus = stateItem.milkcollectionsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setMilkcollectionsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postMilkcollectionsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateMilkcollectionsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postMilkcollectionsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("MilkcollectionsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    milkcollectionsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="MilkcollectionsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postMilkcollectionsFormData} encType="multipart/form-data" id="milk_collections_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                {milk_collectionsNode?.primkey ? (  <span>{`Collection details / Ref - #${milk_collectionsNode?.collection_id}`}</span> ) :(<span> New Collection</span>)}
              </div>
              <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                {paramMilkcollectionsUptoken && (
                  <DeleteButton
                  src="MilkcollectionsMainProfilePage"
                  tableName="milk_collections"
                  uptoken={paramMilkcollectionsUptoken}
                  stateItemSetters={stateItemSetters}
                  parentStateSetters={parentStateSetters}
                  
                  onDelete={popDeleteDialog}
                  />
                )}
              </div>)}</>
            </h3>
            {/*    Title isle      */}
            
            
            
            {/*    Navigation isle      */}
            <><div className="row justify-content-end m-0 p-0 col-md-12  p-3 bg-white hive_profile_navigation " id="">
              <div className="col-md-4 text-left p-0 hive_profile_nav_back_to_list_tray" id="">
                
                {showNavigationIsle && ( <Link href="./list" className="text-info hive_profile_nav_back_to_list"><i className="fa fa-arrow-left"></i> Back to list</Link>)}
                
              </div>
              <div className="col-md-8 p-0 text-right hive_profile_nav_add_new_tray" id="">
                
                
                
                {paramMilkcollectionsUptoken && (
                  <>
                  
                  <MosyActionButton
                  label=" Send SMS "
                  icon="send"
                  onClick={()=>{formartGradersMessage(true,handleInputChange)}}
                  />
                  
                </>
              )}
              
              {paramMilkcollectionsUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="MilkcollectionsMainProfilePage"
                tableName="milk_collections"
                uptoken={paramMilkcollectionsUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="MilkcollectionsMainProfilePage"
                tableName="milk_collections"
                link="./profile"
                label="New Collection"
                icon="plus" />
              </>
            )}
            
          </div>
        </div></>
        <div className="col-md-12 pt-4 p-0 hive_profile_navigation_divider d-lg-none" id=""></div>
        {/*    Navigation isle      */}
        <div className="row justify-content-center m-0 p-0 col-md-12" id="">
          {/*    Image section isle      */}
          
          {/*    Image section isle      */}
          
          {/*  //-------------    main content starts here  ------------------------------ */}
          
          
          
          <div className="col-md-12 row justify-content-center m-0  p-0">
            {/*    Input cells section isle      */}
            <div className="col-md-12 row p-0 justify-content-center p-0 m-0">
              <div className="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section  ">
                <h5 className="col-md-12 row p-2 justify-content-center p-0 m-0">
                  <div className="col-md-3 bg-dark mb-3 mb-lg-0 mt-lg-3" style={{height: "1px"}}></div>
                  <div className="col-md-5 text-center">Collection Details</div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.farmers.base}
                  tblName="farmers"
                  parentTable="milk_collections"
                  inputName="txt__farmers_farmer_name_farmer_id"
                  hiddenInputName="txt_farmer_id"
                  valueField="farmer_id"
                  displayField="farmer_name"
                  label="Farmer"
                  defaultValue={{ farmer_id: milk_collectionsNode?.farmer_id || "", farmer_name: milk_collectionsNode?._farmers_farmer_name_farmer_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) => {
                    handleInputChange(`txt_recipient_phone`,(dataRes?.phone || ``)),
                    handleInputChange(`txt_message_body`,formartGradersMessage(false))
                  }}
                  onInputChange={handleInputChange}
                  defaultColSize="col-md-6 hive_data_cell "
                  context={{hostParent : hostParent}}
                  />
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.graderslist.base}
                  tblName="graders"
                  parentTable="milk_collections"
                  inputName="txt__graders_grader_name_grader_id"
                  hiddenInputName="txt_grader_id"
                  valueField="grader_id"
                  displayField="grader_name"
                  label="Grader"
                  defaultValue={{ grader_id: milk_collectionsNode?.grader_id || "", grader_name: milk_collectionsNode?._graders_grader_name_grader_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize="col-md-6 hive_data_cell "
                  context={{hostParent : hostParent}}
                  />
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label className="d-none">Society</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.milkcollections.base}
                    idField="primkey"
                    labelField="society_id"
                    inputName="txt_society_id"
                    label="Society"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={milk_collectionsNode?.society_id || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="milk_collections"
                  field="collection_date"
                  label="Collection Date"
                  value={milk_collectionsNode?.collection_date || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="date"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label >Session</label>
                    
                    <select name="txt_session" id="txt_session" className="form-control">
                      <option  value={milk_collectionsNode?.session || ""}>{milk_collectionsNode?.session || "Select Session"}</option>
                      <option>Morning</option>
                      <option>Evening</option>
                      <option>Night</option>
                      
                    </select>
                  </div>
                  
                  
                  <MosySmartField
                  module="milk_collections"
                  field="quantity_litres"
                  label="Litres"
                  value={milk_collectionsNode?.quantity_litres || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="milk_collections"
                  field="remarks"
                  label="Remarks"
                  value={milk_collectionsNode?.remarks || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                </div>
                
              </div>
              
              <div className="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section  ">
                <h5 className="col-md-12 row p-2 justify-content-center p-0 m-0">
                  <div className="col-md-3 bg-dark mb-3 mb-lg-0 mt-lg-3" style={{height: "1px"}}></div>
                  <div className="col-md-5 text-center"></div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <input className="form-control" id="txt_recipient_phone" name="txt_recipient_phone" value={milk_collectionsNode?.recipient_phone || ""} placeholder="Recipient Phone" type="hidden"/>
                  
                  
                  <input className="form-control" id="txt_message_body" name="txt_message_body" value={milk_collectionsNode?.message_body || ""} placeholder="Generated SMS" type="hidden"/>
                  
                  
                  <input className="form-control" id="txt_delivery_report" name="txt_delivery_report" value={milk_collectionsNode?.delivery_report || ""} placeholder="Delivery Report" type="hidden"/>
                  
                  
                  <input className="form-control" id="txt_status" name="txt_status" value={milk_collectionsNode?.status || ""} placeholder="Status" type="hidden"/>
                  
                  
                  <input className="form-control" id="sms_mosy_action" name="sms_mosy_action" value={milk_collectionsNode?.sms_mosy_action || ""} placeholder="Sms Mosy Action" type="hidden"/>
                  
                  
                  <input className="form-control" id="sms_uptoken" name="sms_uptoken" value={milk_collectionsNode?.sms_uptoken || ""} placeholder="Sms Uptoken" type="hidden"/>
                  
                  
                  <input className="form-control" id="txt_collection_ref" name="txt_collection_ref" value={milk_collectionsNode?.collection_ref || ""} placeholder="Collection Ref" type="hidden"/>
                  
                  
                  <MosySmartField
                  module="milk_collections"
                  field="generated_sms"
                  label="Generated Sms"
                  value={milk_collectionsNode?.generated_sms || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="MilkcollectionsMainProfilePage"
                  tblName="milk_collections"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="milk_collections_uptoken" name="milk_collections_uptoken" value={paramMilkcollectionsUptoken}/>
              <input type="hidden" id="milk_collections_mosy_action" name="milk_collections_mosy_action" value={milkcollectionsActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          
          
          <style jsx global>{`
          .data_list_section {
            display: none;
          }
          .bottom_tbl_handler{
            padding-bottom:70px!important;
          }
          `}
        </style>
        {milk_collectionsNode?.primkey && (
          <section className="col-md-12 m-0 bg-white pt-5 p-0 ">
            <h5 className="col-md-12 text-left  border-bottom pl-lg-1 text-muted mb-3"> {`Farmer Collections history`} </h5>
            
            <MilkcollectionsList
            key={`${customQueryStr}-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : btoa(`where farmer_id='${milk_collectionsNode?.farmer_id}'`),
              customProfilePath:""
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateMilkcollectionsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          </section>
        )}
      </div>
    </div>
  </div>
  
  
  {/* snack notifications -- */}
  {snackMessage &&(
    <MosySnackWidget
    content={snackMessage}
    duration={5000}
    type="custom"
    onDone={() => {
      stateItemSetters.setSnackMessage("");
      stateItem.snackOnDone(); // Run whats inside onDone
      deleteUrlParam("snack_alert")
    }}
    
    />)}
    {/* snack notifications -- */}
    
    
    {/* ================== End Feature Section========================== ------*/}
  </div>
  
);

}

