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