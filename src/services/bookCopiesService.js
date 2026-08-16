
import { apiRequest } from "./helpers";

export const getBookCopies = async (
    {
        pageNumber = 1,
        pageSize = 5,
        searchTerm = '',
        bookID = 1,
    }={}
) => {
try{
    console.log(`{pageNumber: ${pageNumber}, pageSize: ${pageSize}, searchTerm:${searchTerm}, bookID: ${bookID}}`);
    const query = new URLSearchParams({
        PageNumber: String(pageNumber),
        PageSize: String(pageSize),
        SearchTerm : String(searchTerm),
        BookID: bookID ? String(bookID) : '' ,
    }).toString();

const {ok, data, status,headers} = await apiRequest(`BookCopy?${query}`);
console.log('Received book copies list response:', { ok, status, headers });
if(!ok){
    
 throw new Error(`Failed to fetch book copies list, status code: ${status}, status text: ${status.text}`);
}

const paginationHeader = headers.get('x-pagination');
const totalPages = paginationHeader ? JSON.parse(paginationHeader).TotalPages : 0;

return {
    data: data,
    totalPages:totalPages,
}

}catch(error){
    console.log(`Error occurred while feching book copies: ${error}`);
 throw error;
}
}


export const addBookCopy = async ({ bookId, numberOfCopies, condition = "New" }) => {
  try {
    const payload = {
      BookID: bookId,
      Quantity: numberOfCopies,
      Condition: condition,
    };

    const { ok, data, status } = await apiRequest('BookCopy', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!ok) {
      const errorMessage = data?.message || data?.title || `Failed to add book copies, status code: ${status}`;
      throw new Error(errorMessage);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error adding book copies:', error);
    throw error;
  }
};
