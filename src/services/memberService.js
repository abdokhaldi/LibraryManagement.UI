import {API_URL} from './config';
import { apiRequest } from './helpers';

export const getMembers = async ({
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
  orderBy = '',
} = {}) => {
  try {
    console.log('Fetching members list...');
    const query = new URLSearchParams({
      PageNumber: String(pageNumber),
      PageSize: String(pageSize),
      SearchTerm: searchTerm,
      OrderBy: orderBy,
    }).toString();

    const { ok, data, status, headers } = await apiRequest(`Member?${query}`);
    console.log('Received members list response:', { ok, status, headers });

    if (!ok) {
      throw new Error(`Failed to fetch members, status code: ${status}`);
    }

    const paginationHeader = headers.get('x-pagination');
    const totalPages = paginationHeader ? JSON.parse(paginationHeader).TotalPages : 0;
    console.log('Parsed total pages:', totalPages);

    return {
      data,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching members list:', error);
    throw error;
  }
};

export const checkPersonExist = async (nationalNumber) => {
    if(!nationalNumber)
     return {
      success: false,
      errorMessage: `Missing required national number`,
    };
   
    try{
        const {ok,data,headers} = await apiRequest(`Person/${encodeURIComponent(nationalNumber)}/CheckPersonExistence`)
        if(ok){
          console.log(data);
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



