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
import { loadFarmersListData, popDeleteDialog, InteprateFarmersEvent  } from '../dataControl/FarmersRequestHandler';

//state management
import { useFarmersState } from '../dataControl/FarmersStateManager';

import logo from '../../../img/logo/logo.png'; // outside public!

//large text
import ReactMarkdown from 'react-markdown';

//routes manager
///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();



//export list

export default function FarmersList({ dataIn = {}, dataOut = {} }) {
  
  //incoming data in from parent
  const {
    customQueryStr = "",
    customProfilePath="../farmers/profile",
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
  
  //manage Farmers states
  const [stateItem, stateItemSetters] = useFarmersState(settersOverrides);
  
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
    
    loadFarmersListData(customQueryStr, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  return (
    
    <div className={`col-md-12 bg-white p-0 m-0  ${showDataControlSections && ("main_list_container")}  `} style={{marginTop: "0px", paddingBottom: "0px"}}>
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"farmers", keyword:stateItem.farmersQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Farmers </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_farmers" name="txt_farmers" className="custom-search-input form-control" placeholder="Search in Farmers "
          onChange={(e) => stateItemSetters.setFarmersQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qfarmers_btn" name="qfarmers_btn" type="submit"><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <a href="list" className="medium_btn border border_set btn-white hive_list_nav_refresh ml-3"><i className="fa fa-refresh mr-1 "></i> Refresh </a>
            
            
            <AddNewButton src="FarmersList" link={customProfilePath} label="New Farmer" icon="user-plus" />
          </div>
        </div>
      </div> )}
      
      
      <div className="table-responsive  data-tables bg-white bottom_tbl_handler">
        
        <div className="text-left m-0 p-0 col-md-12">
          <div className="ml-2 cpointer badge btn_neo p-2 rounded badge-primary mb-3 tbl_print_btn"
          onClick={() => {mosyPrintToPdf({elemId : "farmers_print_card", defaultTitle:"Farmers"})}}
          >
          <i className="fa fa-print "></i> Print List
        </div>
        <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
        
        onClick={() => exportTableToExcel("farmers_data_table", "Farmers.xlsx")}
        >
        <i className="fa fa-arrow-right "></i> Export to excel
      </div>
    </div>
    <div className="col-md-12 m-0 p-0" id="farmers_print_card">
      <table className="table table-hover  text-left printTarget" id="farmers_data_table">
        <thead className="text-uppercase">
          <tr>
            <th scope="col">#</th>
            
            <th scope="col"><b>Full Name</b></th>
            <th scope="col"><b>Account Number</b></th>
            <th scope="col"><b>Phone Number</b></th>
            <th scope="col"><b>Location</b></th>
            <th scope="col"><b>Registration Date</b></th>
            
          </tr>
          
        </thead>
        <tbody>
          {stateItem.farmersLoading ? (
            <tr>
              <th scope="col">#</th>
              <td colSpan="6" className="text-muted">
                <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Farmers ...</h5>
              </td>
            </tr>
          ) : stateItem.farmersListData?.length > 0 ? (
            stateItem.farmersListData.map((listfarmers_result, index) => (
              <Fragment key={`_row_${listfarmers_result.primkey}`}>
                <tr key={listfarmers_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn"><b>{listfarmers_result.row_count}</b></div>
                      <div className="table_cell_dropdown-content">
                        <MosySmartDropdownActions
                        tblName="farmers"
                        setters={{
                          
                          childStateSetters: stateItemSetters,
                          parentStateSetters: parentStateSetters
                          
                        }}
                        
                        attributes={`${listfarmers_result.primkey}:${customProfilePath}:false`}
                        callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                        
                        />
                        
                      </div>
                    </div>
                  </td>
                  
                  <td scope="col"><span title={listfarmers_result.farmer_name}>{magicTrimText(listfarmers_result.farmer_name, 70)}</span></td>
                  <td scope="col"><span title={listfarmers_result.farmer_number}>{magicTrimText(listfarmers_result.farmer_number, 70)}</span></td>
                  <td scope="col"><span title={listfarmers_result.phone}>{magicTrimText(listfarmers_result.phone, 70)}</span></td>
                  <td scope="col"><span title={listfarmers_result.location}>{magicTrimText(listfarmers_result.location, 70)}</span></td>
                  <td scope="col"><span title={listfarmers_result.date_registered}>{mosyFormatDateOnly(listfarmers_result.date_registered)}</span></td>
                  
                </tr>
                
                
              </Fragment>
              
            ))
            
          ) : (
            
            <tr><td colSpan="6" className="text-muted">
              
              
              <div className="col-md-12 text-center mt-4">
                <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no farmers records found</h6>
                
                <AddNewButton src="FarmersList"  link={customProfilePath} label="New Farmer" icon="user-plus" />
                <div className="col-md-12 pt-5 " id=""></div>
              </div>
            </td></tr>
            
          )}
        </tbody>
      </table>
    </div>
    <MosyPaginationUi
    src="FarmersList"
    tblName="farmers"
    totalPages={stateItem.farmersListPageCount}
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

