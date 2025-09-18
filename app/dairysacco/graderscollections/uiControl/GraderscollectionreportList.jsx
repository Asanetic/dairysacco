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
import { loadGraderscollectionreportListData, popDeleteDialog, InteprateGraderscollectionreportEvent  } from '../dataControl/GraderscollectionreportRequestHandler';

//state management
import { useGraderscollectionreportState } from '../dataControl/GraderscollectionreportStateManager';

import logo from '../../../img/logo/logo.png'; // outside public!

//large text
import ReactMarkdown from 'react-markdown';

//routes manager
import apiRoutes from '../../AppRoutes/apiRoutes.json'


//export list

export default function GraderscollectionreportList({ dataIn = {}, dataOut = {} }) {
  
  //incoming data in from parent
  const {
    customQueryStr = "",
    customProfilePath="../graderscollections/profile",
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
  
  //manage Graderscollectionreport states
  const [stateItem, stateItemSetters] = useGraderscollectionreportState(settersOverrides);
  
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
    
    loadGraderscollectionreportListData(customQueryStr, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  return (
    
    <div className={`col-md-12 bg-white p-0 m-0  ${showDataControlSections && ("main_list_container")}  `} style={{marginTop: "0px", paddingBottom: "0px"}}>
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"graders", keyword:stateItem.graderscollectionreportQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Graders collection report </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_graders" name="txt_graders" className="custom-search-input form-control" placeholder="Search in Graders collection report "
          onChange={(e) => stateItemSetters.setGraderscollectionreportQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qgraders_btn" name="qgraders_btn" type="submit"><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <a href="list" className="medium_btn border border_set btn-white hive_list_nav_refresh ml-3"><i className="fa fa-refresh mr-1 "></i> Refresh </a>
            
            
            <AddNewButton src="GraderscollectionreportList" link={customProfilePath} label="New Grader" icon="user" />
          </div>
        </div>
      </div> )}
      
      
      <div className="table-responsive  data-tables bg-white bottom_tbl_handler">
        
        <div className="text-left m-0 p-0 col-md-12">
          <div className="ml-2 cpointer badge btn_neo p-2 rounded badge-primary mb-3 tbl_print_btn"
          onClick={() => {mosyPrintToPdf({elemId : "graders_print_card", defaultTitle:"Graders collection report"})}}
          >
          <i className="fa fa-print "></i> Print List
        </div>
        <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
        
        onClick={() => exportTableToExcel("graders_data_table", "Graders collection report.xlsx")}
        >
        <i className="fa fa-arrow-right "></i> Export to excel
      </div>
    </div>
    <div className="col-md-12 m-0 p-0" id="graders_print_card">
      <table className="table table-hover  text-left printTarget" id="graders_data_table">
        <thead className="text-uppercase">
          <tr>
            <th scope="col">#</th>
            
            <th scope="col"><b>Grader Name</b></th>
            <th scope="col"><b>Phone Number</b></th>
            <th scope="col"><b>Society</b></th>
            <th scope="col"><b>Date Registered</b></th>
            <th scope="col"><b>Username</b></th>
            
          </tr>
          
        </thead>
        <tbody>
          {stateItem.graderscollectionreportLoading ? (
            <tr>
              <th scope="col">#</th>
              <td colSpan="7" className="text-muted">
                <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Graders collection report ...</h5>
              </td>
            </tr>
          ) : stateItem.graderscollectionreportListData?.length > 0 ? (
            stateItem.graderscollectionreportListData.map((listgraders_result, index) => (
              <Fragment key={`_row_${listgraders_result.primkey}`}>
                <tr key={listgraders_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn"><b>{listgraders_result.row_count}</b></div>
                      <div className="table_cell_dropdown-content">
                        <MosySmartDropdownActions
                        tblName="graders"
                        setters={{
                          
                          childStateSetters: stateItemSetters,
                          parentStateSetters: parentStateSetters
                          
                        }}
                        
                        attributes={`${listgraders_result.primkey}:${customProfilePath}:false`}
                        callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                        
                        />
                        
                      </div>
                    </div>
                  </td>
                  
                  <td scope="col"><span title={listgraders_result.grader_name}>{magicTrimText(listgraders_result.grader_name, 70)}</span></td>
                  <td scope="col"><span title={listgraders_result.phone}>{magicTrimText(listgraders_result.phone, 70)}</span></td>
                  <td scope="col"><span title={listgraders_result.society_id}>{magicTrimText(listgraders_result.society_id, 70)}</span></td>
                  <td scope="col"><span title={listgraders_result.date_registered}>{mosyFormatDateOnly(listgraders_result.date_registered)}</span></td>
                  <td scope="col"><span title={listgraders_result.username}>{magicTrimText(listgraders_result.username, 70)}</span></td>
                  
                </tr>
                
                
                <tr className="bg-light">
                  <td>-</td>
                  <td colSpan="9">
                    {/*<!-- Start  Title ribbon-->*/}
                    <div className="col-md-12 row p-2  justify-content-center p-0">
                      <div className="col text-left h6"><b>{`Collection history`}</b></div>
                      <div className="col-md-12 border-bottom border_set"></div>
                    </div>
                    {/*<!-- End Title ribbon-->*/}
                    
                    {Array.isArray(listgraders_result.collection_history) && listgraders_result.collection_history.length > 0 ? (
                      <>
                      {/*-- Start Table --*/}
                      <div className="table-responsive data-tables">
                        <table className="table table-hover text-left">
                          <thead className="text-uppercase">
                            <tr>
                              <th>#</th>
                              <th>collection date</th>
                              <th>session</th>
                              <th>quantity litres</th>
                              <th>farmer name</th>
                              <th>collection id</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {/*$graders_collection_history_row_count=0;
                            */}
                            {listgraders_result.collection_history.map((graders_collection_history_record, idx) => (
                              
                              <tr key={`mini_list_${graders_collection_history_record.row_count}`}>
                                <td><b>{graders_collection_history_record.row_count}</b></td>
                                <td>{magicTrimText(graders_collection_history_record.collection_date,70)}</td>
                                <td>{magicTrimText(graders_collection_history_record.session,70)}</td>
                                <td>{magicTrimText(graders_collection_history_record.quantity_litres,70)}</td>
                                <td>{magicTrimText(graders_collection_history_record.farmer_name,70)}</td>
                                <td>{magicTrimText(graders_collection_history_record.collection_id,70)}</td>
                                
                              </tr>
                            ))}
                            
                          </tbody>
                          <tfoot>
                            <tr>
                              <td></td>
                              
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              
                            </tr>
                          </tfoot>
                          
                        </table>
                      </div>
                      {/*<!-- End Table -->*/}
                      {/*<!-- Start  Title ribbon-->*/}
                      <div className="col-md-12 row p-2  justify-content-center p-0">
                        <div className="col text-left multigrid_view_more skip_print no-export "><a href={`transactions_list?milk_collections_mosyfilter=${btoa(`grader_id='${listgraders_result.grader_id}'`)}&mosytitle=${btoa(`Collection history`)}`}></a></div>
                      </div>
                      {/*<!-- End Title ribbon--> */}
                    </>
                  ) : (
                    <div className="col-md-12 text-center " id="">No Collection History records found</div>
                    
                  )}
                  
                </td>
              </tr>
              
              
              
            </Fragment>
            
          ))
          
        ) : (
          
          <tr><td colSpan="7" className="text-muted">
            
            
            <div className="col-md-12 text-center mt-4">
              <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no milk graders records found</h6>
              
              <AddNewButton src="GraderscollectionreportList"  link={customProfilePath} label="New Grader" icon="user" />
              <div className="col-md-12 pt-5 " id=""></div>
            </div>
          </td></tr>
          
        )}
      </tbody>
    </table>
  </div>
  <MosyPaginationUi
  src="GraderscollectionreportList"
  tblName="graders"
  totalPages={stateItem.graderscollectionreportListPageCount}
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

