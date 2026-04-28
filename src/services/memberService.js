import {API_URL} from './config';
import { apiRequest } from './helpers';

export const checkPersonExist = async (nationalNumber) => {
    if(!nationalNumber)
     return {
      success: false,
      errorMessage: `Missing required national number`,
    };
   
    try{
        const {ok,data,headers} = await apiRequest(`Person/${encodeURIComponent(nationalNumber)}/CheckPersonExistence`,{})
        if(ok){
         return  {
            success: true,
           };
         }
        
        return {
          success: false,
          errorMessage: data?.message || 'Failed to check member existence',
        };
    }  catch (error){
      console.log("Server Error :", error);
    }
   
}



