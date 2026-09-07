import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";





export default function Register(){



    const navigate = useNavigate();





    const [username,setUsername] = useState("");

    const [password,setPassword] = useState("");

    const [confirmPassword,setConfirmPassword] = useState("");



    const [showPassword,setShowPassword] = useState(false);

    const [showConfirmPassword,setShowConfirmPassword] = useState(false);



    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);









    async function handleRegister(

        e:React.FormEvent

    ){


        e.preventDefault();



        setError("");







        if(password !== confirmPassword){


            setError(

                "Passwords do not match"

            );


            return;

        }







        setLoading(true);







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


                        password


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







            navigate(

                "/login"

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



                onSubmit={handleRegister}



                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"



            >







                <div className="text-center mb-8">


                    <h1 className="text-3xl font-bold text-blue-700">


                        SentinelAI


                    </h1>



                    <p className="text-gray-500 mt-2">


                        Create your risk intelligence account


                    </p>


                </div>









                {error && (


                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">


                        {error}


                    </div>


                )}









                <label className="font-semibold text-sm">


                    Username


                </label>





                <input


                    className="border w-full p-3 rounded-xl mt-2 mb-4 focus:ring-2 focus:ring-blue-400"



                    placeholder="Enter username"



                    value={username}



                    onChange={e=>

                        setUsername(

                            e.target.value

                        )

                    }


                />









                <label className="font-semibold text-sm">


                    Password


                </label>







                <div className="relative">


                    <input



                        className="border w-full p-3 rounded-xl mt-2 pr-12 focus:ring-2 focus:ring-blue-400"



                        type={


                            showPassword

                            ?

                            "text"

                            :

                            "password"


                        }



                        placeholder="Enter password"



                        value={password}



                        onChange={e=>

                            setPassword(

                                e.target.value

                            )

                        }


                    />




                    <button


                        type="button"


                        className="absolute right-3 top-4 text-gray-500"



                        onClick={()=>


                            setShowPassword(

                                !showPassword

                            )


                        }


                    >


                        {showPassword ? "🙈" : "👁️"}


                    </button>



                </div>









                <label className="font-semibold text-sm block mt-5">


                    Confirm Password


                </label>








                <div className="relative">


                    <input



                        className="border w-full p-3 rounded-xl mt-2 pr-12 focus:ring-2 focus:ring-blue-400"



                        type={


                            showConfirmPassword

                            ?

                            "text"

                            :

                            "password"


                        }



                        placeholder="Confirm password"



                        value={confirmPassword}



                        onChange={e=>

                            setConfirmPassword(

                                e.target.value

                            )

                        }


                    />





                    <button


                        type="button"


                        className="absolute right-3 top-4 text-gray-500"



                        onClick={()=>


                            setShowConfirmPassword(

                                !showConfirmPassword

                            )


                        }


                    >



                        {showConfirmPassword ? "🙈" : "👁️"}



                    </button>



                </div>









                <button



                    disabled={loading}



                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl mt-6 font-semibold transition"



                >



                    {


                    loading

                    ?

                    "Creating account..."

                    :

                    "Create Account"


                    }



                </button>









                <p className="text-center mt-5 text-sm">


                    Already have an account?



                    <button


                        type="button"


                        className="text-blue-600 ml-1 font-semibold"



                        onClick={()=>navigate("/login")}


                    >


                        Login


                    </button>


                </p>






            </form>





        </div>



    );

}