import {
    useState
} from "react";


import {
    useAuth
} from "./AuthContext";


import {
    useNavigate
} from "react-router-dom";


import {
    API_URL
} from "../config";









export default function Login(){



    const {

        login

    } = useAuth();





    const navigate = useNavigate();







    const [username,setUsername] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);









    async function handleLogin(

        e:React.FormEvent

    ){


        e.preventDefault();




        setError("");

        setLoading(true);







        try{



            const response = await fetch(

                `${API_URL}/auth/login`,

                {

                    method:"POST",


                    headers:{


                        "Content-Type":

                        "application/json"


                    },


                    body:JSON.stringify({


                        username,


                        password


                    })


                }

            );








            const data = await response.json();








            if(!response.ok){


                throw new Error(


                    data.detail ||


                    "Login failed"


                );


            }








            login(

                data.access_token

            );








            localStorage.setItem(

                "username",

                username

            );








            navigate(

                "/dashboard"

            );







        }


        catch(error:any){



            setError(

                error.message

            );



        }


        finally{


            setLoading(false);


        }



    }









    return (



        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">







            <form



                onSubmit={handleLogin}



                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"



            >







                <div className="text-center mb-8">



                    <h1 className="text-3xl font-bold text-blue-700">


                        SentinelAI


                    </h1>



                    <p className="text-gray-500 mt-2">


                        Environmental Risk Intelligence Platform


                    </p>



                </div>









                {error && (


                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">


                        {error}


                    </div>


                )}









                <label className="block text-sm font-semibold mb-2">


                    Username


                </label>





                <input



                    className="border w-full p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"



                    placeholder="Enter username"



                    value={username}



                    onChange={e=>

                        setUsername(

                            e.target.value

                        )

                    }



                />









                <label className="block text-sm font-semibold mb-2">


                    Password


                </label>









                <input



                    className="border w-full p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"



                    type="password"



                    placeholder="Enter password"



                    value={password}



                    onChange={e=>

                        setPassword(

                            e.target.value

                        )

                    }



                />









                <button



                    type="submit"



                    disabled={loading}



                    className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"



                >



                    {


                    loading

                    ?

                    "Signing in..."

                    :

                    "Login"


                    }



                </button>







            </form>







        </div>



    );

}