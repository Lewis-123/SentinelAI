import {
    useNavigate
} from "react-router-dom";


import {
    useAuth
} from "../../auth/AuthContext";







interface Props {

    onMenuClick:()=>void;

}









export default function DashboardNavbar({

    onMenuClick

}:Props){



    const navigate = useNavigate();




    const {

        logout

    } = useAuth();







    const username = localStorage.getItem(

        "username"

    ) || "User";









    function getInitials(

        name:string

    ){


        return name

        .trim()

        .split(" ")

        .map(

            word => word.charAt(0)

        )

        .join("")

        .substring(0,2)

        .toUpperCase();



    }









    function handleLogout(){



        logout();



        localStorage.removeItem(

            "username"

        );



        navigate(

            "/login"

        );



    }









    return (




        <header


            className="

            fixed

            top-0

            right-0

            left-0

            lg:left-64

            h-16

            bg-white

            shadow-sm

            z-30

            flex

            items-center

            justify-between

            px-5

            "



        >







            {/* Mobile Menu Button */}



            <button



                onClick={onMenuClick}



                className="

                lg:hidden

                text-2xl

                text-gray-700

                hover:text-blue-600

                transition

                "



            >


                ☰


            </button>









            {/* Page Brand */}



            <div className="hidden lg:block">


                <h1 className="text-xl font-bold text-blue-700">


                    SentinelAI


                </h1>



                <p className="text-xs text-gray-500">


                    Environmental Risk Intelligence


                </p>



            </div>












            {/* User Area */}



            <div className="flex items-center gap-4 ml-auto">








                {/* Avatar */}



                <div



                    className="

                    w-11

                    h-11

                    rounded-full

                    bg-blue-600

                    text-white

                    flex

                    items-center

                    justify-center

                    font-bold

                    shadow

                    "



                >




                    {

                    getInitials(

                        username

                    )

                    }



                </div>









                {/* User Information */}



                <div className="hidden md:block">


                    <p className="font-semibold text-gray-800">


                        {username}


                    </p>




                    <p className="text-xs text-gray-500">


                        Risk Analyst


                    </p>



                </div>









                {/* Logout */}



                <button



                    onClick={handleLogout}



                    className="

                    bg-red-500

                    hover:bg-red-600

                    text-white

                    px-4

                    py-2

                    rounded-lg

                    font-medium

                    transition

                    "



                >



                    Logout



                </button>







            </div>







        </header>



    );

}