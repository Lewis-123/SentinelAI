import {
    useState
} from "react";


import {
    Link,
    useNavigate
} from "react-router-dom";





export default function Register(){



    const navigate = useNavigate();



    const [username,setUsername] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");






    async function register(e:React.FormEvent){


        e.preventDefault();



        try{


            const response = await fetch(

                "http://127.0.0.1:8000/auth/register",

                {


                    method:"POST",


                    headers:{


                        "Content-Type":

                        "application/json"


                    },


                    body:JSON.stringify({


                        username,

                        password,

                        role:"community"


                    })


                }

            );





            const data = await response.json();





            if(!response.ok){


                throw new Error(

                    data.detail ||

                    "Registration failed"

                );


            }





            navigate("/login");



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

                onSubmit={register}

                className="bg-white shadow rounded-xl p-8 w-96"

            >


                <h1 className="text-2xl font-bold mb-6">

                    Create SentinelAI Account

                </h1>




                {error && (

                    <p className="text-red-500 mb-3">

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

                    className="bg-blue-600 text-white w-full p-3 rounded"

                >

                    Register

                </button>



                <p className="mt-4">


                    Already have an account?


                    {" "}


                    <Link

                        className="text-blue-600"

                        to="/login"

                    >

                        Login

                    </Link>


                </p>


            </form>


        </div>

    );

}