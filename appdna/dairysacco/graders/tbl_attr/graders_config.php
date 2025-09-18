<?php

////1. graders

//"primkey" , "grader_id" , "record_id" , "grader_name" , "phone" , "society_id" , "date_registered" , "password" , "username" , "hive_site_id" , "hive_site_name" , <br><br>


//{{table_cols_head}}

/// A.I. NOTES :  please dont omit any keys or variables rewrite new values with code leave keys intact, dont delete commented code , where possible replace it with new commented values if you are capable 

  // =========================
  // Core definitions
  // =========================
  $primary_table__="graders";
  $__page_title ="Graders List";

  $core_module_configs_=[

    //important
    "primary_table"=>$primary_table__,
    "table_alias" =>"graders",     
    "primary_key"=>"primkey",
    "record_id"=>"grader_id",
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
           // "graders" => ["grader_name","phone","society_id"]
        ],

        // Default values for profile | dont use for now
        "custom_profile_default_data" => [
            //"grader_name" => "checkblank(getarr_val_(\$grader_node,'grader_name'),'Unknown Grader')",
            //"phone" => "checkblank(getarr_val_(\$grader_node,'phone'),'0')"
        ],

        // Custom query hooks for Next.js
        "custom_next_js_query_line_cols" => [
            "related_collections" => [
                "function" => "await mosyCountRows('collections', `where grader_id ='\${row?.record_id}'`)",
                "args" => [],
                "return" => "data_res?.total"
            ],
            "linked_society" => [
                "function" => "await mosyFetchOne('societies', `where society_id ='\${row?.society_id}'`)",
                "args" => [],
                "return" => "data_res?.society_name"
            ]
        ]
    ],


    // =========================
    // UI schema section
    // =========================
    "page_layout" => [

        // Column order
        "desired_column_order" => [
            "graders" => ["primkey","grader_id","grader_name","phone","society_id","date_registered","username","password","hive_site_id","hive_site_name"]
        ],

        // Grouped inputs
        "form_input_segmentation_arr" => [
            "graders" => [
                "Grader Details" => ["grader_name","phone","society_id","date_registered","username","password"]
            ]
        ],

        "image_columns" => [],
        "default_col_class" => "col-md-6",
        "hidden_inputs" => [], 
        "print_tables" => ["graders"], 
        "skip_cols_profile" => ["hive_site_id","hive_site_name"], 
        "skip_cols_list" => ["hive_site_id","hive_site_name","password"], 
        "running_bal_col_tbl" => [],
        "grid_tbl" => [], 
        "view_tbl_only" => [],
        "sum_cols_list" => [], 
        "textarea_array" => [], 
        "content_editable" => [], 

        "static_drop_down_array" => [
            //"society_id" => "Society1,Society2"
        ],

        "dynamic_drop_down_array" => [
            "society_id" => "societies:society_id:society_name:apiRoutes.societieslist.base"
        ], 
        "password_columns" => ["password"], 
        "title_columns" => ["grader_name"], 
        "date_columns" => ["date_registered"],
        "datetime_columns" => [],

        "rename_cols_array" => [ 
            "grader_name" => "Grader Name",
            "phone" => "Phone Number",
            "society_id" => "Society",
            "date_registered" => "Date Registered",
            "username" => "Username"
        ],

        "rename_tables_array" => [
            "graders" => "Milk Graders"
        ],

        "new_label_buttons_arr" => [ 
            "graders" => "user:New Grader:{`Grader profile / \${gradersNode?.grader_name}`}"
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
        ],
        "custom_profile_default_data" => [],
        "connection_cols" => [ 
          // "society_id" => "societies:society_id:society_name:apiRoutes.societieslist.base"
        ]
    ]
  
  ];

  /// button you want on the list page
  $list_btn_table_array=[

    $primary_table__=>[
       //"refresh: Sync Graders "=>"syncGradersData()"
    ],  
  ];


  /// buttons you want on the profile /form page
  $profile_btn_table_array=[

    $primary_table__=>[
       //"phone: Call Grader "=>"callGrader()"
    ],

  ];


  //// on each row you add more actions eg, view followups, send message
  $global_new_drop_down_link_arr=[

      $primary_table__=>[
         //"comments: View Collections"=>"viewGraderCollections()",
         //"envelope_fa-envelope: Send SMS"=>"sendGraderSMS()"
    ],
  ];


  ///append mini list for interlinked data eg graders & collections
  $interlink_lists=[
    
   "relatedCollections"=>[ 
     "filter_str"=>"grader_id='\${gradersNode?.grader_id}'",
     "module_name"=>"Milkcollections",
     "list_title"=>"Milk Collections history",
     "event_name"=>"InteprateMilkcollectionsEvent",
     "event_path"=>"../../milkcollections/dataControl/MilkcollectionsRequestHandler",     
     "module_path"=>"../../milkcollections/uiControl/MilkcollectionsList",     
     "list_url"=>"../milkcollections/list",
     "profile_url"=>"../milkcollections/profile",
   ]
   
  ];
   
  ///append mini profile for interlinked data
  $interlink_profile=[
   
   /*"linkedSociety"=>[ 
     "filter_str"=>"society_id='{graders_Node?.society_id}'",
     "module_name"=>"Societies",
     "profile_title"=>"Related Society",
     "event_name"=>"InteprateGradersEvent",
     "event_path"=>"../../graders/dataControl/GradersRequestHandler",     
     "list_table_name"=>"societies",
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
