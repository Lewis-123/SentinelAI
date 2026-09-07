import {

    useState

} from "react";


import {

    Outlet

} from "react-router-dom";


import DashboardNavbar from "./DashboardNavbar";


import Sidebar from "./Sidebar";









export default function DashboardLayout(){



    const [

        sidebarOpen,

        setSidebarOpen

    ] = useState(false);







    return (




        <div className="min-h-screen bg-gray-100 flex">







            <Sidebar


                open={sidebarOpen}


                close={()=>setSidebarOpen(false)}


            />








            <div className="flex-1">





                <DashboardNavbar


                    onMenuClick={()=>setSidebarOpen(true)}


                />








                <main className="p-6">


                    <Outlet/>


                </main>





            </div>





        </div>



    );

}