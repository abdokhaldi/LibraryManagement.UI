import { useEffect, useState } from 'react';

export default function BookForm({bookForUpdate,categories, isOpen, onClose, onAdd , onEdit}) {

  const [title, setTitle] = useState(bookForUpdate?.title || '');
  const [author, setAuthor] = useState(bookForUpdate?.author ||'');
  const [publisher, setPublisher] = useState(bookForUpdate?.publisher || '');
  const [yearPublished, setYearPublished] = useState(bookForUpdate?.yearPublished || '');
  const [isbn, setIsbn] = useState(bookForUpdate?.isbn || '');
  const [categoryID, setCategoryID] = useState( bookForUpdate?.category || categories[0]?.categoryID);
  const [description, setDescription] = useState(bookForUpdate?.description || '');
  const [copies, setCopies] = useState(1);
  const [image, setImage] = useState(bookForUpdate?.image || null);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(bookForUpdate){
        console.log("book for update id : ", bookForUpdate.bookID); // this log shows the correct id
       onEdit({bookID:bookForUpdate.bookID, title, isbn,author, publisher,yearPublished, categoryID, description,image});
    }else{
    
    onAdd({title, isbn,author, publisher,yearPublished, categoryID, description,image});
    }
    setTitle('');
    setIsbn('');
    setCategoryID('');
    setAuthor('');
    setPublisher('');
    setYearPublished('');
    setDescription('');
    setCopies(1);
    setImage(null);
    onClose();
  };
 
  
   const handleFileChange = (e) => {
   if(e.target.files && e.target.files.length > 0){
      setImage(e.target.files[0]);
   }
   }
   

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-gray-600/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-lg border-2  border-green-400">
        <h2 className="text-xl mb-4">{bookForUpdate?"Update Book" :"Add New Book"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <div className='flex  w-full gap-5'>
          <input
            type="number"
            placeholder="Year published"
            value={yearPublished}
            onChange={(e) => setYearPublished(e.target.value)}
            className="flex-1 p-2 border rounded "
            required
            min={1450}
            max={new Date().getUTCFullYear() + 1}
          />
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            className=" flex-1 p-2 border rounded"
          >
            {
              categories.map((category) => (
               <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
            ))}
          </select>
          </div>
          <input
            type="number"
            min="1"
            placeholder="Copies"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value, 10))}
            className="p-2 border rounded"
            required
          />
          <input 
          type="file" 
          className='file:p-2 file:border file:rounded file:w-[50%] file:cursor-pointer file:bg-gray-200 file:mr-5'
          onChange={handleFileChange}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
             >
              {bookForUpdate?"Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
