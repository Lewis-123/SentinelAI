import { useEffect, useState } from "react";





export default function RiskHistory() {


    const [history, setHistory] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");







    async function loadHistory() {


        try {


            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                "http://127.0.0.1:8000/history/",

                {

                    headers: {

                        Authorization:

                        `Bearer ${token}`

                    }

                }

            );





            const data = await response.json();





            if (!response.ok) {


                throw new Error(

                    data.detail ||

                    "Failed to load history"

                );

            }






            setHistory(

                data.history || []

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









    useEffect(()=>{


        loadHistory();



    },[]);









    return (

        <div className="card">


            <h2>

                Prediction History

            </h2>





            {loading && (

                <p>

                    Loading history...

                </p>

            )}







            {error && (

                <p className="error">

                    {error}

                </p>

            )}








            {!loading && history.length === 0 && (

                <p>

                    No prediction history available.

                </p>

            )}







            {history.map(

                (item,index)=>(


                    <div

                        key={index}

                        className="history-item"

                    >


                        <h3>

                            {item.location}

                        </h3>




                        <p>

                            Risk Level:

                            {" "}

                            <b>

                            {item.risk_level}

                            </b>

                        </p>





                        <p>

                            Risk Score:

                            {" "}

                            <b>

                            {item.risk_score}/100

                            </b>

                        </p>





                        <p>

                            Confidence:

                            {" "}

                            <b>

                            {item.confidence || 0}%

                            </b>

                        </p>






                        <p>

                            Date:

                            {" "}

                            {item.created_at

                            ? new Date(

                                item.created_at

                              ).toLocaleString()

                            : "N/A"}

                        </p>



                    </div>


                )

            )}



        </div>

    );

}