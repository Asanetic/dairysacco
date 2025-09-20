'use client';

//React
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';


//components
import { MosyAlertCard, MosyNotify ,closeMosyModal } from  '../../../MosyUtils/ActionModals';
import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//basic utils
import { mosyScrollTo , deleteUrlParam, mosyFormInputHandler,mosyUrlParam  } from '../../../MosyUtils/hiveUtils';

//data control and processors
import { inteprateFarmerscollectionhistoryFormAction, farmerscollectionhistoryProfileData , popDeleteDialog, InteprateFarmerscollectionhistoryEvent } from '../dataControl/FarmerscollectionhistoryRequestHandler';

//state management
import { useFarmerscollectionhistoryState } from '../dataControl/FarmerscollectionhistoryStateManager';

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



//import InteprateMilkcollectionsEvent Event manager
import {InteprateMilkcollectionsEvent} from '../../milkcollections/dataControl/MilkcollectionsRequestHandler';

//import MilkcollectionsList component
import MilkcollectionsList from '../../milkcollections/uiControl/MilkcollectionsList';



// export profile


export default function FarmerscollectionhistoryProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="FarmerscollectionhistoryMainProfilePage",
    parentProfileItemId = "FarmerscollectionhistoryProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Farmerscollectionhistory states
  const [stateItem, stateItemSetters] = useFarmerscollectionhistoryState(settersOverrides);
  const farmersNode = stateItem.farmerscollectionhistoryNode
  
  // -- basic states --//
  const paramFarmerscollectionhistoryUptoken  = stateItem.farmerscollectionhistoryUptoken
  const farmerscollectionhistoryActionStatus = stateItem.farmerscollectionhistoryActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setFarmerscollectionhistoryNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postFarmerscollectionhistoryFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateFarmerscollectionhistoryFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postFarmerscollectionhistoryFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("FarmerscollectionhistoryProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    farmerscollectionhistoryProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="FarmerscollectionhistoryProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postFarmerscollectionhistoryFormData} encType="multipart/form-data" id="farmers_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                {farmersNode?.primkey ? (  <span>{`Farmer profile / ${farmersNode?.farmer_name}`}</span> ) :(<span> New Farmer</span>)}
              </div>
              <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                {paramFarmerscollectionhistoryUptoken && (
                  <DeleteButton
                  src="FarmerscollectionhistoryMainProfilePage"
                  tableName="farmers"
                  uptoken={paramFarmerscollectionhistoryUptoken}
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
                
                
                
                {paramFarmerscollectionhistoryUptoken && (
                  <>
                  
                </>
              )}
              
              {paramFarmerscollectionhistoryUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="FarmerscollectionhistoryMainProfilePage"
                tableName="farmers"
                uptoken={paramFarmerscollectionhistoryUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="FarmerscollectionhistoryMainProfilePage"
                tableName="farmers"
                link="./profile"
                label="New Farmer"
                icon="user-plus" />
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
                  <div className="col-md-5 text-center">Farmer Details</div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <MosySmartField
                  module="farmers"
                  field="farmer_name"
                  label="Full Name"
                  value={farmersNode?.farmer_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="title"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="farmers"
                  field="farmer_number"
                  label="Account Number"
                  value={farmersNode?.farmer_number || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="farmers"
                  field="phone"
                  label="Phone Number"
                  value={farmersNode?.phone || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label className="d-none">Location</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.farmerscollectionhistory.base}
                    idField="primkey"
                    labelField="location"
                    inputName="txt_location"
                    label="Location"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={farmersNode?.location || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="farmers"
                  field="date_registered"
                  label="Registration Date"
                  value={farmersNode?.date_registered || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="date"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
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
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="FarmerscollectionhistoryMainProfilePage"
                  tblName="farmers"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="farmers_uptoken" name="farmers_uptoken" value={paramFarmerscollectionhistoryUptoken}/>
              <input type="hidden" id="farmers_mosy_action" name="farmers_mosy_action" value={farmerscollectionhistoryActionStatus}/>
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
        {farmersNode?.primkey && (
          <section className="col-md-12 m-0 bg-white pt-5 p-0 ">
            <h5 className="col-md-12 text-left  border-bottom pl-lg-1 text-muted mb-3"> {`Milk Collections history`} </h5>
            
            <div className="col-md-12 p-2 text-right ">
              <a href={`../milkcollections/list?farmers_mosyfilter=${btoa(`farmer_id='${farmersNode?.farmer_id}'`)}`} className="cpointer"> View More  <i className="fa fa-arrow-right "></i></a>
            </div>
            
            <MilkcollectionsList
            key={`${customQueryStr}-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : btoa(`where farmer_id='${farmersNode?.farmer_id}'`),
              customProfilePath:"../milkcollections/profile"
              
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

