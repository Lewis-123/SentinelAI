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



import "leaflet/dist/leaflet.css";






export default function RiskMap(){



    const [locations,setLocations] = useState<any[]>([]);





    async function loadMap(){


        const token = localStorage.getItem(

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



        const data = await response.json();



        setLocations(

            data.locations || []

        );


    }







    useEffect(()=>{


        loadMap();


    },[]);







    return (


        <div className="h-[500px]">


            <MapContainer


                center={[0.0236,37.9062]}


                zoom={6}


                style={{

                    height:"100%",

                    width:"100%"

                }}


            >



                <TileLayer


                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"


                />





                {locations.map(

                    (item)=>


                    <Marker


                        key={item.location}


                        position={[

                            item.latitude,

                            item.longitude

                        ]}


                    >


                        <Popup>


                            <h3>

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


                        </Popup>


                    </Marker>


                )}





            </MapContainer>



        </div>


    );


}