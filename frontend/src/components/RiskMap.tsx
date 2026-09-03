import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";



const communities = [

  {
    name:"Turkana",
    position:[
      3.312,
      35.565
    ] as [number,number],
    risk:"HIGH"
  },


  {
    name:"Garissa",
    position:[
      -0.453,
      39.646
    ] as [number,number],
    risk:"HIGH"
  },


  {
    name:"Nairobi",
    position:[
      -1.286,
      36.817
    ] as [number,number],
    risk:"LOW"
  }


];



function RiskMap(){


  return (

    <div className="bg-white rounded-xl shadow p-6 mt-10">


      <h2 className="text-xl font-bold mb-5">

        Community Risk Map

      </h2>



      <MapContainer

        center={[
          0.0236,
          37.9062
        ]}

        zoom={6}

        style={{
          height:"500px",
          width:"100%"
        }}

      >


        <TileLayer

          attribution='&copy; OpenStreetMap'

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />



        {
          communities.map(
            (community)=>(


              <Marker

                key={community.name}

                position={
                  community.position
                }

              >


                <Popup>

                  <strong>

                    {community.name}

                  </strong>


                  <br/>


                  Risk Level:

                  {" "}

                  {community.risk}


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