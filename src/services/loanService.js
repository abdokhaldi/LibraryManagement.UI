
import {API_URL} from './config';

export const getLoans = async ({searchTerm,currentPage,pageSize}) => {
            try {
                const res = await fetch(`http://localhost:5016/api/borrowing?SearchTerm=${searchTerm}&pageNumber=${currentPage}&pageSize=${pageSize}`);
                if (!res.ok) {
                   
                    throw new Error("Failed to fetch data");

                }
                    const loadedLoans = await res.json();
                   
                    const paginationHeader = res.headers.get('x-pagination');
                    console.log("new function loaded successfuly");
                 
                 return {
                    data:loadedLoans,
                    totalPages: paginationHeader?JSON.parse(paginationHeader).TotalPages : 0
                 }

            } catch (error) {
                console.error("Server error: ", error);
                throw error;
            }
        };

      export  const returnBook = async (id) => { 
        if(!id) return {success:false, errorMessage:"Invalid ID"};
        try{

            const res = await fetch(`${API_URL}/Borrowing/${id}/ReturnBook`,{
                method:'PATCH',
                headers:{
                    "Content-Type": "application/json"
                },

            });
             
            let data = null;
            let contentType = res.headers.get("content-type"); 
            if(contentType && contentType.includes("application/json")){
                data = await res.json();
            }
            

            if(!res.ok){

               return {
                success:false,
                errorMessage : data.message
               }
            }

            return {
                success:true
            }

        }catch(error){
          
          throw error;
        }
    };