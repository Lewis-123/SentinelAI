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



        <div className="min-h-screen bg-gray-100">







            {/* Sidebar */}



            <Sidebar



                open={sidebarOpen}



                close={()=>setSidebarOpen(false)}



            />









            {/* Main Application Area */}



            <div className="flex-1">







                {/* Top Navbar */}



                <DashboardNavbar



                    onMenuClick={()=>setSidebarOpen(true)}



                />









                {/* Page Content */}



                <main


                    className="

                    pt-20

                    p-6

                    lg:ml-64

                    min-h-screen

                    "



                >



                    <Outlet/>



                </main>







            </div>







        </div>



    );

}