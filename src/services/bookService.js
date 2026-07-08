import { apiRequest } from "./helpers";
import { API_URL } from "./config";
import { AuthService } from "./authService";


  export const getBooksList = async ({ 
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
  category = 0,
} = {}) => {
    try {
    console.log('Fetching books list...');
        const query = new URLSearchParams({
            PageNumber: String(pageNumber),
            PageSize: String(pageSize),
      Category: category ? String(category) : '',
            SearchTerm: searchTerm,
        }).toString();

    const { ok, data, status, headers } = await apiRequest(`Book?${query}`);
    console.log('Received books list response:', { ok, status, headers });
   
    if (!ok) {
      throw new Error(`Failed to fetch books, status code: ${status}`, status.text);
       }

         const paginationHeader = headers.get('x-pagination');
    const totalPages = paginationHeader ? JSON.parse(paginationHeader).TotalPages : 0;
    console.log('Parsed total pages:', totalPages);
      
       return {
      data,
      totalPages,
       };
  } catch (error) {
    console.error('Error fetching books list:', error);
        throw error;
    }
};
 
  export const getCategoriesList = async () => {
    try{
      const {ok,data, status} = await apiRequest(`Category`);
    if(!ok){
     throw new Error ("Faild to fetch categories list , status code : " + status , "status text : "+ status.text);
    }
    
    console.log("categories loaded successfully");
    return {
        data : data,
   }

    }catch(error){
       throw error;
    }
  }

  
 export const addBook = async (newBook) => {
   
  const requiredFields = ['title', 'isbn', 'author', 'publisher', 'yearPublished', 'categoryID', 'description', 'image'];
  
  const formData = new FormData();
 const missing = [];
  for (const key of requiredFields) {
   
    if (key !== 'image' && (newBook[key] === undefined || newBook[key] === null || newBook[key] === '')) {
      missing.push(key);
      continue;
    }
         formData.append(key, newBook[key] ?? '');
  }

   if (missing.length) {
    return {
      success: false,
      errorMessage: `Missing required properties: ${missing.join(', ')}`,
    };
  }
      try{

      const {ok,data,status,headers} = await apiRequest('Book', {
        method: 'POST',
        body: formData,
      });
      
      const locationHeader = headers.get('location');


      if (!ok) {
        
        const msgError = data || 'Failed to add book';
        console.log("error message: " , msgError, "status code: ", status);

        return {
          success: false,
          errorMessage : msgError ,
        }
      }
     
       
      console.log("The book was added successfully :" ,locationHeader);
      
      return {
        success: true,
        data : data , //the value of data is newBookId
        location : locationHeader ,
        newBook : newBook,
      }  

  } catch (error) {
      console.log('Server error : ', error);
      return error
    }
  };


  export const updateBook = async (bookForUpdate) => {
   
  const requiredFields = ['title', 'isbn', 'author', 'publisher', 'yearPublished', 'categoryID','description' ,'image'];
    
    const formData = new FormData();
     for (const key of requiredFields){
        if(bookForUpdate[key])
         formData.append(key, bookForUpdate[key]);
     }

     const isEmpty = formData.entries().next().done;
    if(isEmpty){
      console.log('No value sent to update');
     return {
      success:false,
      errorMessage:"No value sent to update",
     }

    }
     try{
      const {ok,data,status} = await apiRequest(`Book/${bookForUpdate?.bookID}`, {
        method: 'PUT',
        body: formData,
      });
     
     if (!ok) {

        console.log("error message: " + data.message);
     return {
          success: false,
          errorMessage : data.message,
        }
      }

  return {
        success: true,
        updatedBook : bookForUpdate,
      }

  } catch (error) {
      console.log('Server error : ', error);
      return error
    }
  };

  
 export const deleteBook = async (bookId) => {
    try{
      console.log("book id is : ", bookId );
     const {ok,status,data} =  await apiRequest(`Book/${bookId}/DeactivateBook`,
       {
        method: 'PATCH',
        }
     );
   
     if(ok){
       console.log("The book was deleted successfuly", );
       return {
        success: true,
     
      }
     }
     
     console.log("Failed to delete the book, status code : ", status, "message : ", data.message);

     return {
         success:false,
         errorMessage : data.message || "Failed to delete the book",
     }
     
    } catch(error){
      console.log("an error occured :", error);
      return error;
    }
    
  };

