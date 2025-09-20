import { mosy_push_data, mosyBtoa, mosyGetElemVal, mosyPostData, mosyPostFormData, mosyUpdateUrlParam } from "../../MosyUtils/hiveUtils";
import { MosyAlertCard, MosyNotify } from "../../MosyUtils/ActionModals";

import { getApiRoutes } from '../AppRoutes/apiRoutesHandler';

import { updateMilkcollections } from "../milkcollections/dataControl/MilkcollectionsRequestHandler";

const apiRoutes = getApiRoutes(); // Use the imported JSON directly


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