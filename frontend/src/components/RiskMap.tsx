import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";


import "leaflet/dist/leaflet.css";


import L from "leaflet";



// Fix default marker issue

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



interface RiskLocation {


    name:string;

    latitude:number;

    longitude:number;

    risk:string;

}




const locations:RiskLocation[] = [


    {

        name:"Nairobi",

        latitude:-1.286389,

        longitude:36.817223,

        risk:"MEDIUM"

    },


    {

        name:"Turkana",

        latitude:3.1167,

        longitude:35.6,

        risk:"HIGH"

    },


    {

        name:"Mombasa",

        latitude:-4.0435,

        longitude:39.6682,

        risk:"LOW"

    }

];




function RiskMap(){


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


                    attribution='&copy; OpenStreetMap contributors'


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


                                    <strong>

                                        {location.name}

                                    </strong>


                                    <br />


                                    Risk Level:

                                    {" "}

                                    {location.risk}


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