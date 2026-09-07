import {
    useState
} from "react";


import type {
    ReactNode
} from "react";


import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";








interface Props {

    children: ReactNode;

}









export default function DashboardLayout({

    children

}: Props){



    const navigate = useNavigate();


    const location = useLocation();




    const [mobileOpen,setMobileOpen] = useState(false);







    const username = localStorage.getItem(

        "username"

    ) || "User";









    function getInitials(

        name:string

    ){


        return name

        .split(" ")

        .map(

            word => word.charAt(0)

        )

        .join("")

        .substring(0,2)

        .toUpperCase();


    }









    function logout(){



        localStorage.removeItem(

            "token"

        );


        localStorage.removeItem(

            "username"

        );


        navigate(

            "/login"

        );


    }









    function closeMenu(){


        setMobileOpen(false);


    }









    const menuItems = [



        {

            name:"Dashboard",

            path:"/dashboard",

            icon:"🏠"

        },


        {

            name:"Risk Map",

            path:"/dashboard/map",

            icon:"🗺️"

        },


        {

            name:"Alerts",

            path:"/dashboard/alerts",

            icon:"🚨"

        },


        {

            name:"History",

            path:"/dashboard/history",

            icon:"📊"

        }



    ];









    return (




        <div className="min-h-screen bg-gray-100">







            {/* Top Navigation Bar */}


            <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-5">







                <div className="flex items-center gap-4">



                    <button


                        onClick={()=>setMobileOpen(!mobileOpen)}


                        className="md:hidden text-2xl"


                    >


                        ☰


                    </button>







                    <div>


                        <h1 className="text-xl font-bold text-blue-700">


                            SentinelAI


                        </h1>


                        <p className="text-xs text-gray-500 hidden sm:block">


                            Environmental Risk Intelligence Platform


                        </p>


                    </div>



                </div>












                <div className="flex items-center gap-4">






                    {/* User Avatar */}


                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">


                        {

                        getInitials(

                            username

                        )

                        }


                    </div>









                    <div className="hidden md:block text-right">


                        <p className="font-semibold">


                            {username}


                        </p>



                        <p className="text-xs text-gray-500">


                            Risk Analyst


                        </p>


                    </div>









                    <button


                        onClick={logout}


                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"


                    >


                        Logout


                    </button>





                </div>







            </header>













            {/* Mobile Background Overlay */}


            {


            mobileOpen && (



                <div


                    onClick={closeMenu}


                    className="fixed inset-0 bg-black/40 z-30 md:hidden"


                />


            )


            }












            {/* Sidebar */}


            <aside



                className={`fixed top-16 left-0 h-full w-64 bg-slate-900 text-white p-5 z-40 transition-transform duration-300


                ${


                    mobileOpen


                    ?


                    "translate-x-0"


                    :


                    "-translate-x-full md:translate-x-0"


                }


                `}



            >








                <div className="mb-6">


                    <h2 className="text-lg font-bold">


                        SentinelAI Menu


                    </h2>



                    <p className="text-sm text-slate-400">


                        Risk Monitoring System


                    </p>


                </div>









                <nav className="space-y-2">



                {


                    menuItems.map(item=>(



                        <Link



                            key={item.path}



                            to={item.path}



                            onClick={closeMenu}




                            className={`flex items-center gap-3 p-3 rounded-lg transition


                            ${


                                location.pathname === item.path


                                ?


                                "bg-blue-600"


                                :


                                "hover:bg-slate-700"


                            }


                            `}



                        >




                            <span>


                                {item.icon}


                            </span>




                            <span>


                                {item.name}


                            </span>





                        </Link>


                    ))


                }



                </nav>








            </aside>












            {/* Dashboard Content */}


            <main className="pt-20 md:ml-64 p-5 md:p-8">



                {children}



            </main>








        </div>


    );

}