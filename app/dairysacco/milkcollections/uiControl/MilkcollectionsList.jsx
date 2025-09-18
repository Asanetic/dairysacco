'use client';
//React
import { useEffect, useState ,Fragment } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';


//print utils
import { exportTableToExcel } from '../../../MosyUtils/exportToExcel';
import { mosyPrintToPdf } from '../../../MosyUtils/hiveUtils';



//custom utils
import { deleteUrlParam, magicTrimText, mosyUrlParam, mosyFormatDateOnly , mosyFormatDateTime} from '../../../MosyUtils/hiveUtils';
import { mosyFilterUrl } from '../../DataControl/MosyFilterEngine';

//list components
import {
  MosySmartDropdownActions,
  AddNewButton,
  MosyActionButton,
  MosyGridRowOptions,
  MosyPaginationUi,
  DeleteButton,
  MosyImageViewer
} from '../../UiControl/componentControl';

import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//data
import { loadMilkcollectionsListData, popDeleteDialog, InteprateMilkcollectionsEvent  } from '../dataControl/MilkcollectionsRequestHandler';

//state management
import { useMilkcollectionsState } from '../dataControl/MilkcollectionsStateManager';

import logo from '../../../img/logo/logo.png'; // outside public!

//large text
import ReactMarkdown from 'react-markdown';

//routes manager
import apiRoutes from '../../AppRoutes/apiRoutes.json'


//export list

export default function MilkcollectionsList({ dataIn = {}, dataOut = {} }) {
  
  //incoming data in from parent
  const {
    customQueryStr = "",
    customProfilePath="../milkcollections/profile",
    showDataControlSections = true,
    parentUseEffectKey = "",
    parentStateSetters=null,
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey}
  
  //manage Milkcollections states
  const [stateItem, stateItemSetters] = useMilkcollectionsState(settersOverrides);
  
  const localEventSignature = stateItem.localEventSignature
  const snackMessage = stateItem.snackMessage
  const snackOnDone = stateItem.snackOnDone
  
  //use route navigation system if need be
  const router = useRouter();
  
  useEffect(() => {
    
    const snackUrlAlert = mosyUrlParam("snack_alert")
    if(snackUrlAlert)
    {
      stateItemSetters.setSnackMessage(snackUrlAlert)
    }
    
    loadMilkcollectionsListData(customQueryStr, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  return (
    
    <div className={`col-md-12 bg-white p-0 m-0  ${showDataControlSections && ("main_list_container")}  `} style={{marginTop: "0px", paddingBottom: "0px"}}>
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"milk_collections", keyword:stateItem.milkcollectionsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Milk Collections </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_milk_collections" name="txt_milk_collections" className="custom-search-input form-control" placeholder="Search in Milk Collections "
          onChange={(e) => stateItemSetters.setMilkcollectionsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qmilk_collections_btn" name="qmilk_collections_btn" type="submit"><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <a href="list" className="medium_btn border border_set btn-white hive_list_nav_refresh ml-3"><i className="fa fa-refresh mr-1 "></i> Refresh </a>
            
            
            <AddNewButton src="MilkcollectionsList" link={customProfilePath} label="New Collection" icon="plus" />
          </div>
        </div>
      </div> )}
      
      
      <div className="table-responsive  data-tables bg-white bottom_tbl_handler">
        
        <div className="text-left m-0 p-0 col-md-12">
          <div className="ml-2 cpointer badge btn_neo p-2 rounded badge-primary mb-3 tbl_print_btn"
          onClick={() => {mosyPrintToPdf({elemId : "milk_collections_print_card", defaultTitle:"Milk Collections"})}}
          >
          <i className="fa fa-print "></i> Print List
        </div>
        <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
        
        onClick={() => exportTableToExcel("milk_collections_data_table", "Milk Collections.xlsx")}
        >
        <i className="fa fa-arrow-right "></i> Export to excel
      </div>
    </div>
    <div className="col-md-12 m-0 p-0" id="milk_collections_print_card">
      <table className="table table-hover  text-left printTarget" id="milk_collections_data_table">
        <thead className="text-uppercase">
          <tr>
            <th scope="col">#</th>
            
            <th scope="col"><b>Collection Date</b></th>
            <th scope="col"><b>Session</b></th>
            <th scope="col"><b>Litres</b></th>
            <th scope="col"><b>Farmer</b></th>
            <th scope="col"><b>Grader</b></th>
            <th scope="col"><b>Society</b></th>
            <th scope="col"><b>Remarks</b></th>
            <th scope="col"><b>Recipient Phone</b></th>
            <th scope="col"><b>Collection Ref</b></th>
            
          </tr>
          
        </thead>
        <tbody>
          {stateItem.milkcollectionsLoading ? (
            <tr>
              <th scope="col">#</th>
              <td colSpan="10" className="text-muted">
                <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Milk Collections ...</h5>
              </td>
            </tr>
          ) : stateItem.milkcollectionsListData?.length > 0 ? (
            stateItem.milkcollectionsListData.map((listmilk_collections_result, index) => (
              <Fragment key={`_row_${listmilk_collections_result.primkey}`}>
                <tr key={listmilk_collections_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn"><b>{listmilk_collections_result.row_count}</b></div>
                      <div className="table_cell_dropdown-content">
                        <MosySmartDropdownActions
                        tblName="milk_collections"
                        setters={{
                          
                          childStateSetters: stateItemSetters,
                          parentStateSetters: parentStateSetters
                          
                        }}
                        
                        attributes={`${listmilk_collections_result.primkey}:${customProfilePath}:false`}
                        callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                        
                        />
                        
                      </div>
                    </div>
                  </td>
                  
                  <td scope="col"><span title={listmilk_collections_result.collection_date}>{mosyFormatDateOnly(listmilk_collections_result.collection_date)}</span></td>
                  <td scope="col"><span title={listmilk_collections_result.session}>{magicTrimText(listmilk_collections_result.session, 200)}</span></td>
                  <td scope="col"><span title={listmilk_collections_result.quantity_litres}>{magicTrimText(listmilk_collections_result.quantity_litres, 200)}</span></td>
                  <td scope="col"><span title={listmilk_collections_result.farmer_id}>{magicTrimText(listmilk_collections_result._farmers_farmer_name_farmer_id, 200)}</span></td>
                  <td scope="col"><span title={listmilk_collections_result.grader_id}>{magicTrimText(listmilk_collections_result._graders_grader_name_grader_id, 200)}</span></td>
                  <td scope="col"><span title={listmilk_collections_result.society_id}>{magicTrimText(listmilk_collections_result.society_id, 200)}</span></td>
                  <td scope="col"><span>
                    <ReactMarkdown>
                      
                      {magicTrimText(listmilk_collections_result.remarks, 200)}
                      
                    </ReactMarkdown>
                  </span></td>
                  <td scope="col"><span title={listmilk_collections_result.recipient_phone}>{magicTrimText(listmilk_collections_result.recipient_phone, 200)}</span></td>
                  <td scope="col"><span title={listmilk_collections_result.collection_ref}>{magicTrimText(listmilk_collections_result.collection_ref, 200)}</span></td>
                  
                </tr>
                
                
              </Fragment>
              
            ))
            
          ) : (
            
            <tr><td colSpan="10" className="text-muted">
              
              
              <div className="col-md-12 text-center mt-4">
                <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no milk collections records found</h6>
                
                <AddNewButton src="MilkcollectionsList"  link={customProfilePath} label="New Collection" icon="plus" />
                <div className="col-md-12 pt-5 " id=""></div>
              </div>
            </td></tr>
            
          )}
        </tbody>
      </table>
    </div>
    <MosyPaginationUi
    src="MilkcollectionsList"
    tblName="milk_collections"
    totalPages={stateItem.milkcollectionsListPageCount}
    stateItemSetters={stateItemSetters}
    />
  </div>
  
  
</form>
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
</div>
);

}

