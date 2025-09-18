import { Suspense } from 'react';

import GraderslistProfile from '../uiControl/GraderslistProfile';

import { InteprateGraderslistEvent } from '../dataControl/GraderslistRequestHandler';

    
export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Graders List profile"//searchParams?.mosyTitle || "Graders List";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Graders List profile`,
    description: 'dairysacco Graders List',
    
    icons: {
      icon: "/logo.png"
    },    
  };
}
                      

export default function GraderslistMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <GraderslistProfile 
                    dataIn={{ parentUseEffectKey: "initGraderslistProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateGraderslistEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}