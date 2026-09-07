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





    return (



        <aside



            className={`

            fixed

            lg:static

            top-0

            left-0

            h-full

            w-64

            bg-slate-900

            text-white

            z-50

            transform

            ${open ? "translate-x-0":"-translate-x-full"}

            lg:translate-x-0

            transition-transform

            duration-300

            `}



        >






            <div className="p-5 text-xl font-bold">


                SentinelAI


            </div>







            <nav className="space-y-2 px-4">





                <NavLink

                    onClick={close}

                    to="/dashboard"

                    className="block p-3 rounded hover:bg-slate-700"

                >

                    📊 Overview

                </NavLink>







                <NavLink

                    onClick={close}

                    to="/dashboard/map"

                    className="block p-3 rounded hover:bg-slate-700"

                >

                    🗺 Risk Map

                </NavLink>








                <NavLink

                    onClick={close}

                    to="/dashboard/alerts"

                    className="block p-3 rounded hover:bg-slate-700"

                >

                    🚨 Alerts

                </NavLink>








                <NavLink

                    onClick={close}

                    to="/dashboard/history"

                    className="block p-3 rounded hover:bg-slate-700"

                >

                    📈 History

                </NavLink>





            </nav>






        </aside>


    );

}