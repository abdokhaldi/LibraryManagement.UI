
import {API_URL} from './config';
import { apiRequest } from './helpers';

export const getLoans = async ({searchTerm,currentPage,pageSize}) => {
            try {
                const {ok,data, headers} = await apiRequest(`borrowing?SearchTerm=${searchTerm}&pageNumber=${currentPage}&pageSize=${pageSize}`);
                if (!ok) {
                   
                    throw new Error("Failed to fetch data");

                }
                    
                   
                    const paginationHeader = headers.get('x-pagination');
                    console.log("new function loaded successfuly");
                 
                 return {
                    data,
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

export const extendLoanPeriod = async (id, newDueDate) => {
    if (!id || !newDueDate) {
        return { success: false, errorMessage: "Invalid ID or due date" };
    }

    try {
        console.log(newDueDate);
        const { ok, data, status } = await apiRequest(`Borrowing/${id}/ExtendDueDate`, {
            method: 'PATCH',
            body: JSON.stringify({dueDate:newDueDate})
        });

        if (!ok) {
            console.log(data?.message || data?.title || "Operation failed");
            return {
                success: false,
                errorMessage: data?.message || data?.title || "Operation failed",
                status: status
            };
        }
        console.log("extended successfully") ;
        return {
            success: true,
            status: status
        };

    } catch (error) {
        console.error("Service Error:", error.message);
        throw error;
    }
};

export const checkBookCopyByBarcode = async (barcode) => {
    if (!barcode) {
        return { success: false, errorMessage: "Barcode is required" };
    }

    try {
        const { ok, data, status } = await apiRequest(`BookCopy/${barcode}/GetBookCopyByBarcode`);

        if (!ok) {
            return {
                success: false,
                errorMessage: data?.message || data?.title || "Book copy not found",
                status: status
            };
        }

        return {
            success: true,
            data: data,
            status: status
        };

    } catch (error) {
        console.error("Service Error:", error.message);
        throw error;
    }
};
