import { Suspense } from 'react';

import FarmersList from '../uiControl/FarmersList';

import { InteprateFarmersEvent } from '../dataControl/FarmersRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Farmers "//searchParams?.mosyTitle || "Farmers";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Farmers`,
    description: 'dairysacco Farmers',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function FarmersMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <FarmersList  
                    
                     dataIn={{ parentUseEffectKey: "loadFarmersList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateFarmersEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }