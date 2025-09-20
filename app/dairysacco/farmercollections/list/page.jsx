import { Suspense } from 'react';

import FarmerscollectionhistoryList from '../uiControl/FarmerscollectionhistoryList';

import { InteprateFarmerscollectionhistoryEvent } from '../dataControl/FarmerscollectionhistoryRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Farmers collection history "//searchParams?.mosyTitle || "Farmers collection history";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Farmers collection history`,
    description: 'dairysacco Farmers collection history',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function FarmerscollectionhistoryMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <FarmerscollectionhistoryList  
                    
                     dataIn={{ parentUseEffectKey: "loadFarmerscollectionhistoryList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateFarmerscollectionhistoryEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }