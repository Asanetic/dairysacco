const MosyColumnFactory = {

   //-- farmers cols--//
  farmers: ["farmer_id", "farmer_name", "farmer_number", "phone", "location", "date_registered", "hive_site_id", "hive_site_name"],

   //-- graders cols--//
  graders: ["grader_id", "grader_name", "phone", "society_id", "date_registered", "hive_site_id", "hive_site_name", "password", "username"],

   //-- milk_collections cols--//
  milk_collections: ["collection_id", "farmer_id", "grader_id", "society_id", "collection_date", "session", "quantity_litres", "remarks", "hive_site_id", "hive_site_name", "recipient_phone", "message_body", "delivery_report", "status"],

   //-- page_manifest_ cols--//
  page_manifest_: ["manikey", "page_group", "site_id", "page_url", "hive_site_id", "hive_site_name", "project_id", "project_name"],

   //-- sms cols--//
  sms: ["sms_id", "recipient_phone", "message_body", "status", "sent_at", "delivery_report", "hive_site_id", "hive_site_name"],

   //-- system_role_bundles cols--//
  system_role_bundles: ["record_id", "bundle_id", "bundle_name", "remark", "hive_site_id", "hive_site_name"],

   //-- system_users cols--//
  system_users: ["user_id", "name", "email", "tel", "login_password", "ref_id", "regdate", "user_no", "user_pic", "user_gender", "last_seen", "about", "hive_site_id", "hive_site_name", "auth_token", "token_status", "token_expiring_in", "project_id", "project_name"],

   //-- user_bundle_role_functions cols--//
  user_bundle_role_functions: ["record_id", "bundle_id", "bundle_name", "role_id", "role_name", "remark", "hive_site_id", "hive_site_name"],

   //-- user_manifest_ cols--//
  user_manifest_: ["admin_mkey", "user_id", "user_name", "role_id", "site_id", "role_name", "hive_site_id", "hive_site_name", "project_id", "project_name"],


};
export default MosyColumnFactory;