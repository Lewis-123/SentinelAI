import {

    NavLink

} from "react-router-dom";







interface Props {


    open:boolean;


    close:()=>void;


}









export default function Sidebar({

    open,

    close

}:Props){







    const links = [


        {

            name:"Overview",

            path:"/dashboard",

            icon:"📊"

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

            name:"Prediction History",

            path:"/dashboard/history",

            icon:"📈"

        }


    ];









    return (



        <>



            {/* Mobile Overlay */}


            {

            open && (


                <div


                onClick={close}


                className="fixed inset-0 bg-black/40 z-40 lg:hidden"


                />


            )

            }









            <aside



            className={`

            fixed

            top-0

            left-0

            h-screen

            w-64

            bg-slate-950

            text-white

            z-50

            transition-transform

            duration-300

            flex

            flex-col


            ${

            open

            ?

            "translate-x-0"

            :

            "-translate-x-full"

            }


            lg:translate-x-0

            `}



            >







                {/* Logo */}



                <div className="h-16 flex items-center px-6 border-b border-slate-800">



                    <h1 className="text-xl font-bold text-blue-400">


                        SentinelAI


                    </h1>



                </div>









                {/* Navigation */}



                <nav className="flex-1 p-4 space-y-2">





                {

                links.map(item=>(



                    <NavLink



                    key={item.path}



                    to={item.path}



                    onClick={close}



                    className={({isActive})=>



                    `

                    flex

                    items-center

                    gap-3

                    px-4

                    py-3

                    rounded-xl

                    transition


                    ${

                    isActive

                    ?

                    "bg-blue-600 text-white shadow-lg"

                    :

                    "text-gray-300 hover:bg-slate-800"

                    }


                    `



                    }



                    >



                        <span className="text-xl">


                            {item.icon}


                        </span>





                        <span className="font-medium">


                            {item.name}


                        </span>






                    </NavLink>



                ))

                }





                </nav>









                {/* Footer */}



                <div className="p-4 border-t border-slate-800 text-sm text-gray-400">


                    AI Risk Intelligence Platform


                </div>






            </aside>






        </>



    );

}