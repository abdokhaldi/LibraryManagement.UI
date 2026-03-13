

 function Profile(){

    return (
     <div className="flex justify-center items-center gap-4 bg-green-500 absolute bottom-5 left-4">
        <div className="bg-white h-15 w-15 rounded-full"></div>
        <div className="flex flex-col h-full w-fit">
            <p className="text-white font-bold text-lg">Admin Panel</p>
            <p>v4.2.0 Enterprise</p>
        </div>
     </div>

    );
}
export default Profile;