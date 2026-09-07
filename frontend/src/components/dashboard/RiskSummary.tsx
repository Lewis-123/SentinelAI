import { useEffect, useState } from "react";





interface RiskLocation {


    location:string;


    risk_level:string;


    risk_score:number;


    latitude:number;


    longitude:number;


}









export default function RiskSummary(){



    const [locations,setLocations] = useState<RiskLocation[]>([]);


    const [loading,setLoading] = useState(true);


    const [error,setError] = useState("");








    async function loadLocations(){


        try{


            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                "http://127.0.0.1:8000/risk-locations",

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

                    "Failed loading locations"

                );

            }






            setLocations(

                data.locations || []

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


        loadLocations();



    },[]);








    return (


        <div className="card">



            <h2>

                Highest Risk Locations

            </h2>








            {loading && (

                <p>

                    Loading risk locations...

                </p>

            )}






            {error && (

                <p className="error">

                    {error}

                </p>

            )}







            {!loading && locations.length===0 && (

                <p>

                    No analyzed locations available.

                </p>

            )}







            {

                locations.map(

                    (item,index)=>(


                        <div

                            key={item.location}

                            className="risk-row"

                        >



                            <span>


                                {index + 1}. {item.location}


                            </span>






                            <span>


                                {item.risk_level}

                                {" "}

                                {item.risk_score}/100


                            </span>






                        </div>


                    )

                )

            }




        </div>


    );

}