import { useEffect, useState } from "react";





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


                const response = await fetch(

                    "http://127.0.0.1:8000/history/"

                );



                const data = await response.json();



                setHistory(

                    data.history || []

                );


            }

            catch(error){

                console.error(error);

            }


        }



        loadHistory();



    },[]);







    return (

        <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

                Prediction History

            </h2>




            {

            history.length === 0 ?


            (

                <p>

                    No prediction history available.

                </p>

            )


            :

            (

                history.map((item,index)=>(


                    <div

                    key={index}

                    className="border-b py-3"

                    >


                        <p className="font-bold">

                            {item.location}

                        </p>



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


                ))

            )

            }



        </div>

    );

}