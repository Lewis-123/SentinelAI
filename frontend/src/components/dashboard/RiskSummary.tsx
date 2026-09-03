export default function RiskSummary() {


    const locations = [

        {
            name:"Turkana",
            level:"HIGH",
            score:87
        },

        {
            name:"Nairobi",
            level:"MEDIUM",
            score:65
        },

        {
            name:"Kisumu",
            level:"LOW",
            score:35
        }

    ];



    return (

        <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

                Highest Risk Locations

            </h2>



            {locations.map((item,index)=>(


                <div

                    key={item.name}

                    className="flex justify-between border-b py-3"

                >

                    <span>

                        {index + 1}. {item.name}

                    </span>


                    <span>

                        {item.level}

                        {" "}

                        {item.score}/100

                    </span>


                </div>


            ))}



        </div>

    );

}