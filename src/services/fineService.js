import { apiRequest } from "./helpers";

// this method is used to get the fine for a specific borrowing ID
export const getLoanFine = async (borrowingID) => {
     
      try {
        const {ok,data,status} = await apiRequest(`Fines?BorrowingID=${borrowingID}`);
        if (!ok) {
          throw new Error("Failed to load fines history, status code: " + status);
         } 
     console.log("fine loaded successfully with status code: ", status);
    return {
        data: Array.isArray(data) ? data : [],
    }

      } catch (err) {
       console.log('Error fetching fines: ' + err.message);
       throw error
      } 
    };

  export  const pay = async (id)=> {
    try{
    const {ok,data,status} = await apiRequest(`fines/${id}/Pay`, {
      method:'PATCH',
    });

    if(!ok){
       console.log("fine pay was failed with status code:", status);
       return {
        success: false,
        errorMessage: data.message || 'Failed to pay fine',
       }
    }

    console.log("The fine was paid successfully");
     
    return {
        success: true,

     }

  }catch(error){
   console.log("an error occured while paying the fine: " , error.message);
   throw error;
  }
 }

 export const waive = async ({id, waiveReason }) => {
  if(!waiveReason) return;
  if(!id) return;
  try{
    const {ok,data,status} = await apiRequest(`Fines/${id}/Waive`, {
      method:'PATCH',
      body:JSON.stringify(waiveReason),
    });

    if(ok)
    return {
    success: true,
  }
   
    
  console.log("fine waive was failed with status code:", status);
      return {
       success: false,
       errorMessage: data.message || 'Failed to waive fine',
      }

 }catch(error){
 throw error;
  }
}
