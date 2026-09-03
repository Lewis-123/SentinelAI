import {

    useState

} from "react";


import {

    useAuth

} from "./AuthContext";


import {

    useNavigate

} from "react-router-dom";







export default function Login(){



    const {

        login

    } = useAuth();




    const navigate = useNavigate();





    const [username,setUsername] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");







    async function handleLogin(

        e:React.FormEvent

    ){


        e.preventDefault();




        try{


            const response = await fetch(

                "http://127.0.0.1:8000/auth/login",

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



            navigate(

                "/dashboard"

            );




        }

        catch(error:any){


            setError(

                error.message

            );

        }


    }








    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">


            <form

                onSubmit={handleLogin}

                className="bg-white shadow rounded-xl p-8 w-96"

            >


                <h1 className="text-2xl font-bold mb-6">

                    SentinelAI Login

                </h1>



                {error && (

                    <p className="text-red-500 mb-4">

                        {error}

                    </p>

                )}




                <input

                    className="border p-3 w-full mb-3 rounded"

                    placeholder="Username"

                    value={username}

                    onChange={e=>

                        setUsername(e.target.value)

                    }

                />




                <input

                    className="border p-3 w-full mb-4 rounded"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={e=>

                        setPassword(e.target.value)

                    }

                />





                <button

                    className="bg-blue-600 text-white p-3 w-full rounded"

                >

                    Login

                </button>




            </form>


        </div>

    );

}