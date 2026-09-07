import {
    ReactNode,
    useState
} from "react";


import {
    Link,
    useNavigate
} from "react-router-dom";




interface Props {

    children: ReactNode;

}






export default function DashboardLayout({

    children

}:Props){



    const navigate = useNavigate();



    const [mobileOpen,setMobileOpen] = useState(false);





    const username = localStorage.getItem(

        "username"

    ) || "User";







    function logout(){


        localStorage.removeItem(

            "token"

        );


        localStorage.removeItem(

            "username"

        );


        navigate("/login");


    }









    return (



        <div className="min-h-screen bg-gray-100">







            {/* Top Navbar */}


            <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 flex items-center justify-between px-6">





                <div className="flex items-center gap-4">


                    <button


                    className="md:hidden text-2xl"


                    onClick={()=>setMobileOpen(!mobileOpen)}


                    >


                        ☰


                    </button>




                    <h1 className="text-xl font-bold text-blue-700">


                        SentinelAI


                    </h1>



                </div>









                <div className="flex items-center gap-5">





                    <div className="text-right hidden sm:block">


                        <p className="font-semibold">


                            {username}


                        </p>


                        <p className="text-xs text-gray-500">


                            Risk Analyst


                        </p>


                    </div>







                    <button


                    onClick={logout}


                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"


                    >


                        Logout


                    </button>





                </div>





            </header>











            {/* Sidebar */}


            <aside


            className={`fixed top-16 left-0 h-full w-64 bg-slate-900 text-white p-5 transition-transform z-40

            ${

                mobileOpen

                ?

                "translate-x-0"

                :

                "-translate-x-full md:translate-x-0"

            }

            `}


            >







                <nav className="space-y-3">



                    <Link

                    to="/dashboard"

                    className="block p-3 rounded-lg hover:bg-slate-700"

                    >

                        🏠 Dashboard

                    </Link>







                    <Link

                    to="/dashboard/map"

                    className="block p-3 rounded-lg hover:bg-slate-700"

                    >

                        🗺 Risk Map

                    </Link>







                    <Link

                    to="/dashboard/alerts"

                    className="block p-3 rounded-lg hover:bg-slate-700"

                    >

                        🚨 Alerts

                    </Link>








                    <Link

                    to="/dashboard/history"

                    className="block p-3 rounded-lg hover:bg-slate-700"

                    >

                        📊 History

                    </Link>






                </nav>







            </aside>












            {/* Main Content */}


            <main className="pt-20 md:ml-64 p-6">



                {children}



            </main>







        </div>


    );

}