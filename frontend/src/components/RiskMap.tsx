import { useEffect, useState } from "react";

import axios from "axios";


import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";


import "leaflet/dist/leaflet.css";


import L from "leaflet";





interface LocationRisk {


    name:string;

    latitude:number;

    longitude:number;

    risk:string;

    confidence:number;


}





function createRiskIcon(risk:string){



    let color = "green";



    if(risk === "HIGH"){

        color = "red";

    }


    else if(risk === "MEDIUM"){

        color = "orange";

    }




    return L.divIcon({


        className:"custom-marker",


        html:


        `

        <div style="

            background:${color};

            width:25px;

            height:25px;

            border-radius:50%;

            border:3px solid white;

            box-shadow:0 0 8px rgba(0,0,0,0.5);

        ">

        </div>

        `


    });


}





function RiskMap(){



    const [locations,setLocations] =

        useState<LocationRisk[]>([]);





    const fetchLocations = async()=>{


        try{


            const response = await axios.get(

                "http://127.0.0.1:8000/locations"

            );



            setLocations(

                response.data.locations

            );



        }


        catch(error){


            console.error(

                "Failed loading locations",

                error

            );


        }


    };






    useEffect(()=>{


        fetchLocations();


    },[]);






    return (



        <div className="bg-white rounded-xl shadow p-6 mt-10">



            <h2 className="text-2xl font-bold mb-5">

                Geographic Risk Intelligence Map

            </h2>





            <MapContainer


                center={[

                    -1.286389,

                    36.817223

                ]}


                zoom={6}


                style={{

                    height:"500px",

                    width:"100%"

                }}



            >



                <TileLayer


                    attribution="&copy; OpenStreetMap contributors"


                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"


                />






                {

                    locations.map(

                        (location,index)=>(



                            <Marker


                                key={index}


                                position={[


                                    location.latitude,


                                    location.longitude


                                ]}



                                icon={

                                    createRiskIcon(

                                        location.risk

                                    )

                                }


                            >



                                <Popup>



                                    <div>



                                        <h3 className="font-bold text-lg">

                                            {location.name}

                                        </h3>




                                        <p>

                                            Risk Level:

                                            {" "}

                                            <strong>

                                            {location.risk}

                                            </strong>

                                        </p>





                                        <p>

                                            Confidence:

                                            {" "}

                                            {location.confidence}%

                                        </p>




                                    </div>




                                </Popup>




                            </Marker>



                        )

                    )

                }





            </MapContainer>






            {/* Map Legend */}


            <div className="mt-5 flex gap-6">


                <div>

                    🔴 High Risk

                </div>


                <div>

                    🟡 Medium Risk

                </div>


                <div>

                    🟢 Low Risk

                </div>



            </div>




        </div>



    )

}




export default RiskMap;