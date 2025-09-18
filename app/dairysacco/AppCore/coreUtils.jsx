import { mosy_push_data, mosyBtoa, mosyGetElemVal, mosyPostData, mosyPostFormData, mosyUpdateUrlParam } from "../../MosyUtils/hiveUtils";
import { MosyAlertCard, MosyNotify } from "../../MosyUtils/ActionModals";
import apiRoutes from '../AppRoutes/apiRoutes.json'
import { insertSmsmessages, updateSmsmessages } from "../smsbox/dataControl/SmsmessagesRequestHandler";
import { updateMilkcollections } from "../milkcollections/dataControl/MilkcollectionsRequestHandler";

export function convertLeadToClient(leadId) 
{
    // Logic to convert lead to client
    const payload = { leadId:"200" };
    
    MosyNotify({message :"Sending payment request...", icon:"send" , id:"topmost"})

    const conversionRes  = mosyPostData({url: apiRoutes.appcore.base, data: payload})

    console.log('Lead converted successfully:', conversionRes);
     
    MosyNotify({message :"Request  super sent", icon:"send" , id:"topmost"})

}


export function addQuotationClass(leadId) 
{
    // Logic to convert lead to client
    const payload = { leadId:"200" };
    
    MosyNotify({message :"Sending payment request...", icon:"send" , id:"topmost"})

    const conversionRes  = mosyPostData({url: apiRoutes.appcore.base, data: payload})

    console.log('Lead converted successfully:', conversionRes);
     
    MosyNotify({message :"Request  super sent", icon:"send" , id:"topmost"})

}

export function makeCall(leadId) 
{
    // Logic to convert lead to client
    const payload = { leadId:"200" };
    
    MosyNotify({message :"Calling ...", icon:"phone" , iconColor:"text-dark", id:"topmost"})

    const conversionRes  = mosyPostData({url: apiRoutes.leadsmanagement.base, data: payload})

    console.log('Lead converted successfully:', conversionRes);
     
    MosyAlertCard({message:"Call onprogress ...", icon:"phone", iconColor:"text-success", yesLabel:"End call", noLabel:"",
        onYes:()=>{
            MosyNotify({message :"Call ended", icon:"check-circle", id:"topmost", addTimer:true, duration:4000})
        },
        
        autoDismissOnClick:false, 
        id:"topmost"})

}


// systemActions.js

// ====================
// Activities
// ====================
export function activities_sendReminder(activityId) {}
export function activities_sendFollowupEmail(activityId) {}

// ====================
// Send SMS
// ====================
export async function sendPrimarySMS({ formSrc="sms_profile_form", phone = "254710766390", message = "Hello, this is a test SMS from the system." }) {
    try {
      const payload = {
        recp: phone,
        body: message,
        pushsms: "ok",
      };
  
      MosyNotify({ message: "Sending SMS...", icon: "send", id: "topmost" });

      //insert sent sms message
        await insertSentSmsmessage(formSrc);

      var smsResponse = await mosyPostData({
        url: apiRoutes.appcore.sendsms,
        data: payload,
        isMultipart: true,
      });

      console.log("SMS sent successfully:", smsResponse);

      //update sent sms message
      await updateSentSmsmessage(formSrc,smsResponse);

      MosyNotify({
        message: "SMS sent successfully",
        icon: "check",
        id: "topmost",
        addTimer: true,
        duration: 4000,
      });
    } catch (error) {
      MosyNotify({
        message: "Failed to send SMS",
        icon: "times-circle",
        iconColor :"text-danger",
        id: "topmost",
        addTimer: true,
        duration: 4000,
      });
      console.error("SMS error:", error);
    }
  }
  

async function insertSentSmsmessage(formSrc="sms_profile_form") {
   
    // Logic to insert sent SMS message into the database
    //update form    
    mosy_push_data("sms_mosy_action", "add_sms");

    //insert new details
    var insertResp =     await mosyPostFormData({
        formId: formSrc,
        url: apiRoutes.smsmessages.base,
        method: 'POST',
        isMultipart: true,
      });
      
    //update the token
    var newToken = mosyBtoa(insertResp?.sms_uptoken || "")
      
    mosy_push_data("sms_uptoken", newToken);
    mosyUpdateUrlParam("sms_uptoken", newToken);
      
}

async function updateSentSmsmessage(formSrc="sms_profile_form", smsResponse={}) {
  
    mosy_push_data("txt_delivery_report", JSON.stringify(smsResponse) || "Sent");
    mosy_push_data("txt_status", "Sent");
    
    mosy_push_data("sms_mosy_action", "update_sms");

    //updateSmsmessages()

    await mosyPostFormData({
        formId: formSrc,
        url: apiRoutes.smsmessages.base,
        method: 'POST',
        isMultipart: true,
      });

}
export function formartGradersMessage(send, inputHandler) 
{

 var farmerPhone=mosyGetElemVal("txt_recipient_phone") || ""
 var collectionsSession = mosyGetElemVal("txt_session") || ""
 var collectionsDate = mosyGetElemVal("txt_collection_date") || ""
 var collectionsLitres = mosyGetElemVal("txt_quantity_litres") || ""
 var collectionId = mosyGetElemVal("txt_collection_ref") || ""
 var farmerName = mosyGetElemVal("txt__farmers_farmer_name_farmer_id") || ""

 var message = `Dear ${farmerName.split(" ")[0]}, ${collectionsSession} milk collection for date ${collectionsDate} has been received.\nQty : ${collectionsLitres} litres.\nCollection Ref: ${collectionId}.\nThank you!`

 if(inputHandler){
    inputHandler("txt_message_body", message);
    inputHandler("txt_generated_sms", message);
 }

 if(send){
  sendPrimarySMS({phone:farmerPhone, message:message, formSrc:"milk_collections_profile_form"})
  updateMilkcollections()  

 }

 return message;

}

export function activities_generateReport(filters = {}) {}

// ====================
// Blog Posts
// ====================
export function blog_publish(postId) {}
export function blog_schedule(postId, date) {}
export function blog_promotePost(postId) {}
export function blog_analyzeEngagement(postId) {}
export function blog_runSEOCheck(postId) {}

// ====================
// Calls
// ====================
export function calls_startSession(callId) {}
export function calls_sendSummaryMessage(callId) {}
export function calls_analyzeConversions(filters = {}) {}
//export function calls_logNotes(callId, notes) {}
///export function calls_setFollowupReminder(callId) {}

// ====================
// Clients
// ====================
export function clients_sendEmail(clientId, templateId) {}
export function clients_sendSMS(clientId, message) {}
export function clients_notifyAccountManager(clientId) {}
export function clients_viewDashboard(clientId) {}
export function clients_generateReport(clientId, options = {}) {}

// ====================
// Content Schedule
// ====================
export function contentSchedule_push(scheduleId) {}
export function contentSchedule_remindBeforePublishing(scheduleId) {}
export function contentSchedule_trackStatus(scheduleId) {}
export function contentSchedule_forecastEngagement(scheduleId) {}

// ====================
// Leads
// ====================
export function leads_sendNurtureEmail(leadId) {}
export function leads_sendSMSCampaign(leadId, message) {}
export function leads_setReminder(leadId, date) {}
export function leads_analyzeSource(leadId) {}
export function leads_convertToClient(leadId) {}

// ====================
// Messages
// ====================
export function messages_sendBulkEmail(messageId) {}
export function messages_sendSMSBlast(messageId) {}
export function messages_scheduleDrip(messageId, scheduleDate) {}
export function messages_trackEngagement(messageId) {}
export function messages_getConversationThread(leadId, clientId) {}
