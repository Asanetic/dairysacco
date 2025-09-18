import { Suspense } from 'react';

import GraderscollectionreportProfile from '../uiControl/GraderscollectionreportProfile';

import { InteprateGraderscollectionreportEvent } from '../dataControl/GraderscollectionreportRequestHandler';

    
export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Graders collection report profile"//searchParams?.mosyTitle || "Graders collection report";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Graders collection report profile`,
    description: 'dairysacco Graders collection report',
    
    icons: {
      icon: "/logo.png"
    },    
  };
}
                      

export default function GraderscollectionreportMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <GraderscollectionreportProfile 
                    dataIn={{ parentUseEffectKey: "initGraderscollectionreportProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateGraderscollectionreportEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}