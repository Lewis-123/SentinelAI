const locations = [

    {
        name:"Turkana",
        score:87,
        level:"HIGH"
    },

    {
        name:"Nairobi",
        score:65,
        level:"MEDIUM"
    },

    {
        name:"Kisumu",
        score:35,
        level:"LOW"
    }

];



export default function RiskSummary(){


    return (

        <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

                Highest Risk Locations

            </h2>



            {

            locations.map((item,index)=>(


                <div

                    key={item.name}

                    className="flex justify-between border-b py-3"

                >

                    <span>

                        {index+1}. {item.name}

                    </span>


                    <span>

                        {item.level}

                        {" "}

                        {item.score}/100

                    </span>


                </div>


            ))

            }



        </div>

    );

}