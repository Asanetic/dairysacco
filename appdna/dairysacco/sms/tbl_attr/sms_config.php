<?php

////1. sms

//"primkey" , "sms_id" , "sender_id" , "recipient_id" , "phone_number" , "message_body" , "status" , "sent_by" , "sent_at" , "delivery_report" , <br><br>


//{{table_cols_head}}

/// A.I. NOTES :  please dont omit any keys or variables rewrite new values with code leave keys intact, dont delete commented code , where possible replace it with new commented values if you are capable 

  // =========================
  // Core definitions
  // =========================
  $primary_table__="sms";
  $__page_title ="SMS Messages";

  $core_module_configs_=[

    //important
    "primary_table"=>$primary_table__,
    "table_alias" =>"smsbox",     
    "primary_key"=>"primkey",
    "record_id"=>"sms_id",
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
            "sms" => ["delivery_receipt"]
        ],

        // Default values for profile | dont use for now
        "custom_profile_default_data" => [
            //"status" => "checkblank(getarr_val_(\$sms_node,'status'),'pending')"
        ],

        // Custom query hooks for Next.js
        "custom_next_js_query_line_cols" => [
            "delivery_receipt" => [
                "function" => "{}",
                "args" => [],
                "return" => "row?.delivery_report"
            ]         
        ]
    ],


    // =========================
    // UI schema section
    // =========================
    "page_layout" => [

        // Column order
        "desired_column_order" => [
            "sms_" => ["primkey","record_id","sms_id","sender_id","recipient_id","phone_number","message_body","status","sent_by","sent_at","delivery_report"]
        ],

        // Grouped inputs
        "form_input_segmentation_arr" => [
            "sms_" => [
                "SMS Details" => ["sender_id","recipient_id","phone_number","message_body","status"]
            ]
        ],

        "image_columns" => [],
        "default_col_class" => "col-md-6",
        "hidden_inputs" => ["sent_at","status","delivery_report"], 
        "print_tables" => [], 
        "skip_cols_profile" => ["hive_site_id","hive_site_name"], 
        "skip_cols_list" => ["hive_site_id","hive_site_name","delivery_report"], 
        "running_bal_col_tbl" => [],
        "grid_tbl" => [], 
        "view_tbl_only" => [],
        "sum_cols_list" => [], 
        "textarea_array" => ["message_body"], 
        "content_editable" => ["status"], 

        "static_drop_down_array" => [
            "status" => "pending,sent,failed,delivered"
        ],

        "dynamic_drop_down_array" => [],
        "password_columns" => [], 
        "title_columns" => ["phone_number"], 
        "date_columns" => [],
        "datetime_columns" => ["sent_at"],

        "rename_cols_array" => [ 
            "recipient_phone" => "Recipient Phone:col-md-12",
            "message_body" => "Message",
            "status" => "Delivery Status:col-md-6",
            "sent_by" => "Sent By:col-md-6",
            "sent_at" => "Sent At:col-md-6"
        ],

        "rename_tables_array" => [
            "sms" => "SMS Messages"
        ],

        "new_label_buttons_arr" => [ 
            "sms" => "envelope:New SMS:{`Sent to / \${smsNode?.recipient_phone} / \${smsNode?.status}`}"
        ],

        "profile_pic_style" => "width:120px; height:120px; border-radius:10%;"
    ],

    // =========================
    // Behaviour schema section
    // =========================
    "data_behaviour" => [
        "custom_query_line_cols" => [ 
        ],
        "custom_multi_grid_rows" => [], 
        "custom_profile_col_data" => [
          "delivery_receipt"=>"?"
        ],
        "custom_profile_default_data" => [
          "status"=>'{smsNode?.status || "Pending"}',
         "sent_at"=>'{smsNode?.sent_at || mosyRightNow()}'],
        "connection_cols" => [ 
           //"recipient_id" => "clients:client_id:client_name:apiRoutes.clientlist.base",
           //"sender_id" => "users:user_id:user_name:apiRoutes.userslist.base"
        ]
    ]
  
  ];

  /// button you want on the list page
  $list_btn_table_array=[

    $primary_table__=>[
       //"envelope: Send Bulk SMS "=>"sendBulkSMS()",
       //"refresh: Refresh Delivery Reports "=>"refreshDeliveryReports()"
    ],  
  ];


  /// buttons you want on the profile /form page
  $profile_btn_table_array=[

    $primary_table__=>[
       "send: Send SMS "=>'sendPrimarySMS({phone : (smsNode?.recipient_phone || "0"), message: (smsNode?.message_body || "message")})'
    ],

  ];


  //// on each row you add more actions eg, view delivery report, resend
  $global_new_drop_down_link_arr=[

      $primary_table__=>[
         //"comments: View Delivery Report"=>"viewDeliveryReport()",
         //"envelope_fa-envelope: Resend SMS"=>"resendSMS()"
    ],
  ];


  ///append mini list for interlinked data eg sms & logs
  $interlink_lists=[
    
   "relatedLogs"=>[ 
     "filter_str"=>"recipient_phone='\${smsNode?.recipient_phone}'",
     "module_name"=>"Smsmessages",
     "list_title"=>"Phone Message history",
     "event_name"=>"InteprateSmsmessagesEvent",
     "event_path"=>"",     
     "module_path"=>"./SmsMessagesList",     
     "list_url"=>"../smsbox/list",
     "profile_url"=>""
   ]
   
  ];
   
  ///append mini profile for interlinked data
  $interlink_profile=[
   
   /*"linkedClient"=>[ 
     "filter_str"=>"client_id='{sms_Node?.recipient_id}'",
     "module_name"=>"Clients",
     "profile_title"=>"Related Client",
     "event_name"=>"InteprateSmsEvent",
     "event_path"=>"../../sms/dataControl/SmsRequestHandler",     
     "list_table_name"=>"clients",
   ]*/
   
  ];  

  ///for interlinked data included as component
  $customProfileData="{}";

  ///=================================== basic template setup 

  $override_def_col_size="col-md-12 hive_data_cell ";
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
