import { Suspense } from 'react';

import MilkcollectionsList from '../uiControl/MilkcollectionsList';

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

export default function MilkcollectionsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <MilkcollectionsList  
                    
                     dataIn={{ parentUseEffectKey: "loadMilkcollectionsList" }}
                       
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