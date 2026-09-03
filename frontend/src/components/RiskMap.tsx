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



// Fix Leaflet marker icons

delete (
    L.Icon.Default.prototype as any
)._getIconUrl;



L.Icon.Default.mergeOptions({

    iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",


    iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",


    shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});





interface LocationRisk {


    name:string;

    latitude:number;

    longitude:number;

    risk:string;

    confidence:number;

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


                            >



                                <Popup>



                                    <div>


                                        <h3 className="font-bold">

                                            {location.name}

                                        </h3>



                                        <p>

                                            Risk:

                                            {" "}

                                            {location.risk}

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



        </div>


    )

}



export default RiskMap;