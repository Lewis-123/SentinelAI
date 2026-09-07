import { useEffect, useState } from "react";





interface TrendItem {


    location:string;


    risk_level:string;


    risk_score:number;


    confidence:number;


    date:string;


}









export default function RiskTrend(){



    const [trend,setTrend] = useState<TrendItem[]>([]);


    const [loading,setLoading] = useState(true);


    const [error,setError] = useState("");








    async function loadTrend(){



        try{


            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                "http://127.0.0.1:8000/risk-trend",

                {


                    headers:{


                        Authorization:

                        `Bearer ${token}`


                    }


                }

            );







            const data = await response.json();






            if(!response.ok){


                throw new Error(

                    data.detail ||

                    "Failed loading trend"

                );


            }







            setTrend(

                data.trend || []

            );



        }


        catch(err:any){


            setError(

                err.message

            );


        }


        finally{


            setLoading(false);


        }


    }








    useEffect(()=>{


        loadTrend();



    },[]);








    return (


        <div className="card">



            <h2>

                Risk Trend

            </h2>







            {loading && (

                <p>

                    Loading trend data...

                </p>

            )}






            {error && (

                <p className="error">

                    {error}

                </p>

            )}








            {!loading && trend.length===0 && (


                <p>

                    No prediction history available.

                </p>


            )}









            {

                trend.map(

                    (item,index)=>(


                        <div

                            key={index}

                            className="trend-item"

                        >



                            <div>


                                <strong>

                                    {item.location}

                                </strong>



                                <p>


                                    Risk:

                                    {" "}

                                    {item.risk_level}


                                </p>


                            </div>







                            <div>


                                <strong>

                                    {item.risk_score}/100

                                </strong>



                                <p>


                                    Confidence:

                                    {" "}

                                    {item.confidence || 0}%

                                </p>


                            </div>





                            <small>


                                {new Date(

                                    item.date

                                ).toLocaleDateString()}



                            </small>





                        </div>


                    )

                )

            }




        </div>

    );

}