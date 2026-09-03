import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";


import {
    useEffect,
    useState
} from "react";


import L from "leaflet";





interface RiskLocation {


    location: string;


    latitude: number;


    longitude: number;


    risk_level: string;


    risk_score: number;

}





export default function RiskMap(){



    const [locations,setLocations] =
        useState<RiskLocation[]>([]);



    const [loading,setLoading] =
        useState(true);






    useEffect(()=>{


        async function fetchRiskMap(){


            try{


                const response =
                    await fetch(
                        "http://127.0.0.1:8000/risk-map"
                    );


                const data =
                    await response.json();



                setLocations(
                    data.locations
                );


            }

            catch(error){


                console.error(
                    "Risk map error:",
                    error
                );


            }

            finally{


                setLoading(false);

            }


        }



        fetchRiskMap();



    },[]);







    function getColor(
        risk:string
    ){


        if(risk==="HIGH")
            return "red";


        if(risk==="MEDIUM")
            return "orange";


        return "green";

    }







    function createIcon(
        risk:string
    ){


        return L.divIcon({

            className:"risk-marker",

            html:

            `
            <div style="
            background:${getColor(risk)};
            width:25px;
            height:25px;
            border-radius:50%;
            border:3px solid white;
            ">
            </div>
            `

        });


    }







    if(loading){


        return (

            <p>
                Loading risk map...
            </p>

        );

    }







    return (


        <div className="w-full h-[600px]">


            <h2 className="text-xl font-bold mb-4">

                SentinelAI Risk Map

            </h2>





            <MapContainer


                center={[
                    -1.2921,
                    36.8219
                ]}


                zoom={6}


                style={{
                    height:"550px",
                    width:"100%"
                }}


            >



                <TileLayer

                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                    attribution="© OpenStreetMap"

                />






                {

                locations.map(
                    (item)=>(


                    <Marker

                        key={
                            item.location
                        }


                        position={[

                            item.latitude,

                            item.longitude

                        ]}


                        icon={

                            createIcon(
                                item.risk_level
                            )

                        }

                    >


                        <Popup>


                            <div>


                                <h3 className="font-bold">

                                    {item.location}

                                </h3>



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


                        </Popup>



                    </Marker>


                    )

                )

                }



            </MapContainer>



        </div>

    );

}