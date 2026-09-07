import {
    useState
} from "react";


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

        .split(" ")

        .map(word=>word[0])

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



        <header className="h-16 bg-white shadow flex items-center justify-between px-5">





            {/* Mobile Menu */}


            <button


                onClick={onMenuClick}


                className="lg:hidden text-2xl"


            >


                ☰


            </button>







            <h1 className="font-bold text-xl text-blue-700">


                SentinelAI


            </h1>









            <div className="flex items-center gap-4">






                {/* Avatar */}


                <div


                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"


                >



                    {

                    getInitials(

                        username

                    )

                    }



                </div>








                <div className="hidden md:block">


                    <p className="font-semibold">


                        {username}


                    </p>



                    <p className="text-xs text-gray-500">


                        Risk Analyst


                    </p>



                </div>








                <button



                    onClick={handleLogout}



                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"



                >


                    Logout


                </button>







            </div>






        </header>



    );

}