<?php

////1. milk_collections

//"primkey" , "collection_id" , "record_id" , "farmer_id" , "grader_id" , "society_id" , "collection_date" , "session" , "quantity_litres" , "remarks" , "hive_site_id" , "hive_site_name" , <br><br>


//{{table_cols_head}}

/// A.I. NOTES :  please dont omit any keys or variables rewrite new values with code leave keys intact, dont delete commented code , where possible replace it with new commented values if you are capable 

  // =========================
  // Core definitions
  // =========================
  $primary_table__="milk_collections";
  $__page_title ="Milk Collections";

  $core_module_configs_=[

    //important
    "primary_table"=>$primary_table__,
    "table_alias" =>"milkcollections",     
    "primary_key"=>"primkey",
    "record_id"=>"collection_id",
    "main_page_title"=>$__page_title,
    "api_endpoint_name"=>"manage",
    "multigrid_col_span"=>"9"      

  ];
  
  $novanest_module_ui_blueprint_ = [

    // =========================
    // Database schema section
    // =========================
    "db_schema" => [

        // Extra table columns dont use for now 
        "custom_tbl_cols" => [
           "custom_txt"=>["sms_mosy_action"=>"","sms_uptoken"=>''],
           "milk_collections" => ["sms_mosy_action","sms_uptoken","collection_ref","generated_sms"]
        ],

        // Default values for profile | dont use for now
        "custom_profile_default_data" => [
            //"session" => "checkblank(getarr_val_(\$collection_node,'session'),'Morning')",
            //"quantity_litres" => "checkblank(getarr_val_(\$collection_node,'quantity_litres'),'0')"
        ],

        // Custom query hooks for Next.js
        "custom_next_js_query_line_cols" => [
            "sms_mosy_action" => [
                "function" => "{}",
                "args" => [],
                "return" => "`add_sms`"
            ],
            "sms_uptoken" => [
                "function" => "{}",
                "args" => [],
                "return" => "`0`"
            ],
            "collection_ref" => [
                "function" => "{}",
                "args" => [],
                "return" => "row?.collection_id"
            ],
            "generated_sms" => [
                "function" => "{}",
                "args" => [],
                "return" => "row?.message_body"
            ]            
        ]
    ],


    // =========================
    // UI schema section
    // =========================
    "page_layout" => [

        // Column order
        "desired_column_order" => [
            "milk_collections" => ["primkey","record_id","collection_id","collection_date","session","quantity_litres","farmer_id","grader_id","society_id","remarks","hive_site_id","hive_site_name"]
        ],

        // Grouped inputs
        "form_input_segmentation_arr" => [
            "milk_collections" => [
                "Collection Details" => ["farmer_id","grader_id","society_id","collection_date","session","quantity_litres","remarks"]
            ]
        ],

        "image_columns" => [],
        "default_col_class" => "col-md-6",
        "hidden_inputs" => ["sms_uptoken","sms_mosy_action","delivery_report","status","message_body","recipient_phone","collection_ref"], 
        "print_tables" => ["milk_collections"], 
        "skip_cols_profile" => ["hive_site_id","hive_site_name"], 
        "skip_cols_list" => ["hive_site_id","hive_site_name","sms_uptoken","sms_mosy_action","status","delivery_report","generated_sms","message_body"], 
        "running_bal_col_tbl" => [],
        "grid_tbl" => [], 
        "view_tbl_only" => [],
        "sum_cols_list" => [], 
        "textarea_array" => ["remarks","message_body","generated_sms"], 
        "content_editable" => [], 

        "static_drop_down_array" => [
            "session" => "Morning,Evening,Night"
        ],

        "dynamic_drop_down_array" => ["society_id"], 
        "password_columns" => [], 
        "title_columns" => [], 
        "date_columns" => ["collection_date"],
        "datetime_columns" => [],

        "rename_cols_array" => [ 
            "farmer_id" => "Farmer",
            "grader_id" => "Grader",
            "society_id" => "Society",
            "collection_date" => "Collection Date",
            "session" => "Session",
            "quantity_litres" => "Litres",
            "message_body" => "Generated SMS"
        ],

        "rename_tables_array" => [
            "milk_collections" => "Milk Collections"
        ],

        "new_label_buttons_arr" => [ 
            "milk_collections" => "plus:New Collection:{`Collection details / Ref - #\${milk_collectionsNode?.collection_id}`}"
        ],

        "profile_pic_style" => "width:120px; height:120px; border-radius:10%;"
    ],

    // =========================
    // Behaviour schema section
    // =========================
    "data_behaviour" => [
        "custom_query_line_cols" => [], 
        "custom_multi_grid_rows" => [], 
        "custom_profile_col_data" => ["generated_sms"],
        "custom_profile_default_data" => [],
        "connection_cols" => [ 
           "farmer_id" => "farmers:farmer_id:farmer_name:apiRoutes.farmers.base:{
           handleInputChange(`txt_recipient_phone`,(dataRes?.phone || ``)),
            handleInputChange(`txt_message_body`,formartGradersMessage(false))
 }",
           "grader_id" => "graders:grader_id:grader_name:apiRoutes.graderslist.base",
          // "society_id" => "societies:society_id:society_name:apiRoutes.societieslist.base"
        ]
    ]
  
  ];

  /// button you want on the list page
  $list_btn_table_array=[

    $primary_table__=>[
       //"refresh: Record Collection "=>"logMilkCollection()",
       //"upload: Import Collections "=>"uploadCollectionData()"
    ],  
  ];


  /// buttons you want on the profile /form page
  $profile_btn_table_array=[

    $primary_table__=>[
       "send: Send SMS "=>'formartGradersMessage(true,handleInputChange)'
      
       // "tint: Record Quality Test "=>"recordQualityTest()"
    ],

  ];


  //// on each row you add more actions eg, view payments, view quality tests
  $global_new_drop_down_link_arr=[

      $primary_table__=>[
         //"money-bill: View Payments"=>"viewCollectionPayments()",
         //"flask: View Quality Tests"=>"viewQualityTests()"
    ],
  ];


  ///append mini list for interlinked data eg collections & payments
  $interlink_lists=[
    
   "relatedCollections"=>[ 
     "filter_str"=>"farmer_id='\${milk_collectionsNode?.farmer_id}'",
     "module_name"=>"Milkcollections",
     "list_title"=>"Farmer Collections history",
     "event_name"=>"InteprateMilkcollectionsEvent",
     "event_path"=>"",     
     "module_path"=>"../../milkcollections/uiControl/MilkcollectionsList",     
     "list_url"=>"../milkcollections/list",
     "profile_url"=>"",
   ],
    
   /*"GraderRelatedCollections"=>[ 
     "filter_str"=>"grader_id='\${milk_collectionsNode?.grader_id}'",
     "module_name"=>"Milkcollections",
     "list_title"=>"Grader Collections history",
     "event_name"=>"InteprateMilkcollectionsEvent",
     "event_path"=>"",     
     "module_path"=>"",     
     "list_url"=>"../milkcollections/list",
     "profile_url"=>"",
   ]*/   
   
  ];
   
  ///append mini profile for interlinked data
  $interlink_profile=[
   
   /*"linkedFarmer"=>[ 
     "filter_str"=>"farmer_id='{collections_Node?.farmer_id}'",
     "module_name"=>"Farmers",
     "profile_title"=>"Related Farmer",
     "event_name"=>"InteprateCollectionsEvent",
     "event_path"=>"../../collections/dataControl/CollectionsRequestHandler",     
     "list_table_name"=>"farmers",
   ]*/
   
  ];  

  ///for interlinked data included as component
  $customProfileData="{}";

  ///=================================== basic template setup 

  $override_def_col_size="col-md-6 hive_data_cell ";
  $override_segmentation_section_class="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section";

  $additional_details_segment_title="";

  $col_size_def='col-md-12';

  $def_profile_container_class="col-md-12 rounded text-left p-2 mb-0  bg-white ";
  $def_profile_inner_container_class='` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`';  
  $override_justify_class="justify-content-start";
  $overide_img_section_class="col-md-6 mr-lg-5";
  $override_large_col_size="col-md-12 hive_data_cell";
  $image_style_="rounded_avatar";
  ///=================================== basic template setup 

?>
