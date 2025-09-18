import { Suspense } from 'react';

import SystemusersmanagementProfile from '../uiControl/SystemusersmanagementProfile';

import { InteprateSystemusersmanagementEvent } from '../dataControl/SystemusersmanagementRequestHandler';

    
export async function generateMetadata({ searchParams }) {
  const mosyTitle = "System Users Management profile"//searchParams?.mosyTitle || "System Users Management";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `System Users Management profile`,
    description: 'dairysacco System Users Management',
    
    icons: {
      icon: "/logo.png"
    },    
  };
}
                      

export default function SystemusersmanagementMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <SystemusersmanagementProfile 
                    dataIn={{ parentUseEffectKey: "initSystemusersmanagementProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateSystemusersmanagementEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}