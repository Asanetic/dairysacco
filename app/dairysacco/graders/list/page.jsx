import { Suspense } from 'react';

import GraderslistList from '../uiControl/GraderslistList';

import { InteprateGraderslistEvent } from '../dataControl/GraderslistRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Graders List "//searchParams?.mosyTitle || "Graders List";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Graders List`,
    description: 'dairysacco Graders List',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function GraderslistMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <GraderslistList  
                    
                     dataIn={{ parentUseEffectKey: "loadGraderslistList" }}
                       
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