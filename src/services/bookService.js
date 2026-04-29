import { apiRequest } from "./helpers";
import { API_URL } from "./config";


  export const getBooksList = async ({
  PageNumber = 1,
  PageSize = 10,
  searchTerm = '',
  category = 0,
} = {}) => {
    try {
    console.log('Fetching books list...');
        const query = new URLSearchParams({
            PageNumber: String(PageNumber),
            PageSize: String(PageSize),
      category: category ? String(category) : '',
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
   
    for (const [key,value] of Object.entries(newBook)){

       if(!value && !key === 'image')
          return {
           errorMessage : "Missing one or more required properties",
        }
     }
    

      const formData = new FormData();
      formData.append("title",newBook.title || "");
      formData.append("isbn", newBook.isbn || "");
      formData.append("author", newBook.author || "");
      formData.append("publisher", newBook.publisher || "");
      formData.append("yearPublished", newBook.yearPublished || "");
      formData.append("categoryID", newBook.categoryID || "");
      formData.append("description", newBook.description || "");
      if(newBook.image){
      formData.append("image", newBook.image);
      }
    
      try{
      const {ok,data,status,headers} = await apiRequest('Book', {
        method: 'POST',
        body: formData,
      });
      
      const locationHeader = headers.get('location');


      if (!ok) {

        console.log("error message: " + data.message);

        return {
          success: false,
          errorMessage : data.message,
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
