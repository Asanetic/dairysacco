import { Suspense } from 'react';

import MilkcollectionsProfile from '../uiControl/MilkcollectionsProfile';

import { InteprateMilkcollectionsEvent } from '../dataControl/MilkcollectionsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Milk Collections "//searchParams?.mosyTitle || "Milk Collections";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Milk Collections`,
    description: 'dairysacco Milk Collections',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function MilkcollectionsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <MilkcollectionsProfile 
                    dataIn={{ parentUseEffectKey: "initMilkcollectionsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateMilkcollectionsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}