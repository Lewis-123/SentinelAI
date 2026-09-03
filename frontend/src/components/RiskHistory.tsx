import {
    useEffect,
    useState
} from "react";





interface HistoryItem {


    location:string;

    risk_level:string;

    risk_score:number;

    date:string;


}





export default function RiskHistory(){



    const [history,setHistory] =

        useState<HistoryItem[]>([]);







    useEffect(()=>{


        async function loadHistory(){



            try{


                const token =

                    localStorage.getItem(

                        "token"

                    );




                const response = await fetch(

                    "http://127.0.0.1:8000/history/",

                    {


                        headers:{


                            Authorization:

                            `Bearer ${token}`


                        }


                    }

                );




                const data =

                    await response.json();





                setHistory(

                    data.history || []

                );



            }


            catch(error){


                console.error(

                    error

                );


            }



        }





        loadHistory();



    },[]);








    return (


        <div>


            <h2 className="text-xl font-bold mb-4">

                Prediction History

            </h2>




            {

            history.length === 0 ?


            (

                <p>

                    No history available.

                </p>


            )

            :


            history.map(

                (item,index)=>(


                    <div

                    key={index}

                    className="border-b py-3"

                    >


                        <b>

                            {item.location}

                        </b>


                        <p>

                            Risk:

                            {" "}

                            {item.risk_level}

                        </p>


                        <p>

                            Score:

                            {" "}

                            {item.risk_score}/100

                        </p>


                    </div>


                )

            )

            }



        </div>


    );


}