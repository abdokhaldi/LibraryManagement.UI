




export default function BorrowModal({onClose}){
    return (
        <div className='bg-red-600 w-full h-full'> 
        <button onClick={onClose}>
           close
        </button>
        </div>
    );
}