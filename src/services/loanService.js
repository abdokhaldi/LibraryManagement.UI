
import {API_URL} from './config';
import { apiRequest } from './helpers';

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

            const {ok, data, status} = await apiRequest(`Borrowing/${id}/ReturnBook`,{
                method:'PATCH',
            });
             
             if(ok){

               return {
                success:true,
            }
        }

        return {
                success:false,
                errorMessage:data.message
            }

        }catch(error){
          
          throw error;
        }
    };

 export const loanBook = async (newLoan) => {
   
    if (!newLoan || !newLoan.barcode || !newLoan.nationalNumber || !newLoan.dueDate || !newLoan.initialFees) {
        console.log(newLoan);
       return { success: false, errorMessage: "Missing required loan data!" };
    }

    try {
        const {ok,status,data,headers} = await apiRequest(`Borrowing`, {
            method: 'POST',
            body: JSON.stringify(newLoan)
        });

        const dataHeader = headers.get("location");
     
        if (!ok) {
           
            return { 
                success: false, 
                errorMessage: data?.message || data?.title || "Operation failed" ,
                status: status,
            };
        }

       console.log("location: ", dataHeader);

        return {
            success: true,
            location: dataHeader || "no location provided",
             status: status,
        };

    } catch (error) {
       
        console.error("Service Error:", error.message);
        throw error;
    }
};