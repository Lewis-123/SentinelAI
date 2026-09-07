import {
    useEffect,
    useState
} from "react";


import {

    MapContainer,

    TileLayer,

    Marker,

    Popup,

    useMap

} from "react-leaflet";


import L from "leaflet";


import "leaflet/dist/leaflet.css";


import {

    API_URL

} from "../config";








type LocationRisk = {


    location: string;


    latitude: number;


    longitude: number;


    risk_level: string;


    risk_score: number;


    color: string;


    temperature?: number;


    rainfall?: number;


    humidity?: number;


    ndvi?: number;


    confidence?: number;


    updated_at?: string;


};









function createRiskIcon(

    level:string

){


    let color = "yellow";



    const riskLevel = level.toUpperCase();




    if(riskLevel === "LOW"){

        color = "green";

    }




    else if(riskLevel === "HIGH"){

        color = "red";

    }







    return L.divIcon({


        className:"risk-marker",



        html:


        `

        <div style="

            width:22px;

            height:22px;

            background:${color};

            border-radius:50%;

            border:3px solid white;

            box-shadow:0 0 8px rgba(0,0,0,.4);

        "></div>

        `,



        iconSize:[25,25],



        iconAnchor:[12,12]


    });


}









function MapBounds({


    locations


}:{


    locations:LocationRisk[]


}){


    const map = useMap();






    useEffect(()=>{



        if(locations.length === 0){

            return;

        }






        const bounds = L.latLngBounds(



            locations.map(item=>[

                item.latitude,

                item.longitude

            ])

        );






        map.fitBounds(


            bounds,


            {

                padding:[50,50]

            }


        );




    },[locations,map]);





    return null;


}









export default function RiskMap(){



    const [locations,setLocations] = useState<LocationRisk[]>([]);



    const [loading,setLoading] = useState(true);



    const [error,setError] = useState("");









    async function loadRiskMap(){



        try{



            const token = localStorage.getItem(

                "token"

            );






            const response = await fetch(



                `${API_URL}/risk-map`,



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

                    "Unable to load risk map"

                );


            }








            setLocations(


                data.locations || []


            );




        }



        catch(error:any){



            console.error(


                "Risk map loading failed",

                error

            );



            setError(

                error.message

            );



        }




        finally{



            setLoading(false);



        }




    }









    useEffect(()=>{



        loadRiskMap();





        const timer = setInterval(


            loadRiskMap,


            30000


        );





        return ()=>clearInterval(timer);




    },[]);









    return (



        <div className="card">






            <h2>

                SentinelAI Risk Intelligence Map

            </h2>









            {loading && (


                <p>

                    Loading risk locations...

                </p>


            )}









            {error && (


                <p className="text-red-600">


                    {error}


                </p>


            )}









            <MapContainer



                center={[

                    -0.0236,

                    37.9062

                ]}




                zoom={6}




                style={{


                    height:"550px",


                    width:"100%",


                    borderRadius:"12px"


                }}



            >









                <TileLayer



                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"



                    attribution="&copy; OpenStreetMap contributors"



                />









                <MapBounds

                    locations={locations}

                />









                {


                    locations.map(

                        item=>(



                            <Marker



                                key={item.location}



                                position={[


                                    item.latitude,


                                    item.longitude


                                ]}




                                icon={

                                    createRiskIcon(

                                        item.risk_level

                                    )

                                }



                            >









                                <Popup>





                                    <div className="p-3">







                                        <h3 className="font-bold text-lg">


                                            🇰🇪 {item.location}


                                        </h3>







                                        <hr/>








                                        <p>


                                            <strong>

                                                Risk Level:

                                            </strong>


                                            {" "}

                                            {item.risk_level}


                                        </p>








                                        <p>


                                            <strong>

                                                Risk Score:

                                            </strong>


                                            {" "}

                                            {item.risk_score}/100


                                        </p>








                                        <p>


                                            🌡 Temperature:

                                            {" "}

                                            {item.temperature ?? "N/A"} °C


                                        </p>








                                        <p>


                                            🌧 Rainfall:

                                            {" "}

                                            {item.rainfall ?? "N/A"} mm


                                        </p>








                                        <p>


                                            💧 Humidity:

                                            {" "}

                                            {item.humidity ?? "N/A"} %


                                        </p>








                                        <p>


                                            🌱 NDVI:

                                            {" "}

                                            {item.ndvi ?? "N/A"}


                                        </p>








                                        <p>


                                            🤖 AI Confidence:

                                            {" "}

                                            {item.confidence ?? "N/A"}%


                                        </p>








                                        <p className="text-sm text-gray-500">


                                            Updated:


                                            {" "}


                                            {


                                                item.updated_at

                                                ?

                                                new Date(

                                                    item.updated_at

                                                ).toLocaleString()


                                                :

                                                "N/A"


                                            }



                                        </p>







                                    </div>





                                </Popup>







                            </Marker>



                        )

                    )

                }







            </MapContainer>









            <div style={{marginTop:"15px"}}>



                <span>

                    🟢 Low Risk

                </span>



                {"   "}



                <span>

                    🟡 Medium Risk

                </span>



                {"   "}



                <span>

                    🔴 High Risk

                </span>



            </div>







        </div>



    );

}