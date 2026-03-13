
function HeaderChart({title}){
 
    return (
         <div className="flex justify-between items-center h-10"> 
             <h2 className="font-bold text-lg">{title}</h2>
             <p className="font-bold text-lg">...</p>
            </div>
    );
}

export default HeaderChart;