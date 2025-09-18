import { Suspense } from 'react';

import GraderscollectionreportList from '../uiControl/GraderscollectionreportList';

import { InteprateGraderscollectionreportEvent } from '../dataControl/GraderscollectionreportRequestHandler';
    
export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Graders collection report"//searchParams?.mosyTitle || "Graders collection report";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Graders collection report`,
    description: 'dairysacco Graders collection report',
    
    icons: {
      icon: "/logo.png"
    },    
  };
}

export default function GraderscollectionreportMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <GraderscollectionreportList  
                    
                     dataIn={{ parentUseEffectKey: "loadGraderscollectionreportList" }}
                       
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