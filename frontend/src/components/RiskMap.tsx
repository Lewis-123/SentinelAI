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

    location:string;

    latitude:number;

    longitude:number;

    risk_level:string;

    risk_score:number;

}







export default function RiskMap(){


    const [locations,setLocations] =
        useState<RiskLocation[]>([]);


    const [loading,setLoading] =
        useState(true);






    useEffect(()=>{


        async function loadMap(){


            try{


                const token =
                    localStorage.getItem(
                        "token"
                    );



                const response = await fetch(

                    "http://127.0.0.1:8000/risk-map",

                    {

                        headers:{

                            Authorization:

                            `Bearer ${token}`

                        }

                    }

                );



                const data =
                    await response.json();



                setLocations(

                    data.locations || []

                );


            }


            catch(error){


                console.error(

                    "Map error",

                    error

                );


            }


            finally{


                setLoading(false);


            }


        }





        loadMap();



    },[]);







    function markerIcon(
        level:string
    ){


        const color =

            level === "HIGH"

            ? "red"

            :

            level === "MEDIUM"

            ? "orange"

            :

            "green";





        return L.divIcon({

            html:

            `

            <div style="

            background:${color};

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

                Loading map...

            </p>

        );

    }






    return (

        <div>


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

                    url=

                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                />




                {

                locations.map(

                    item => (


                        <Marker

                            key={item.location}

                            position={[

                                item.latitude,

                                item.longitude

                            ]}

                            icon={

                                markerIcon(

                                    item.risk_level

                                )

                            }

                        >


                            <Popup>


                                <b>

                                {item.location}

                                </b>


                                <br/>


                                Risk:

                                {" "}

                                {item.risk_level}


                                <br/>


                                Score:

                                {" "}

                                {item.risk_score}/100



                            </Popup>



                        </Marker>


                    )

                )

                }



            </MapContainer>



        </div>

    );

}