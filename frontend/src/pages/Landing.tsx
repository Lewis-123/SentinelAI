import { Link } from "react-router-dom";





export default function Landing(){


    return (

        <div className="min-h-screen bg-gray-950 text-white">



            {/* HERO SECTION */}

            <section className="px-8 py-20 text-center">


                <h1 className="text-6xl font-bold mb-6">

                    SentinelAI

                </h1>




                <h2 className="text-3xl mb-6 text-gray-300">

                    AI-Powered Environmental Risk Intelligence

                </h2>




                <p className="max-w-3xl mx-auto text-lg text-gray-400">


                    Predict, monitor, and visualize environmental

                    risks across Kenya using artificial intelligence,

                    satellite intelligence, weather data, and machine

                    learning.


                </p>






                <div className="flex justify-center gap-5 mt-10">



                    <Link to="/register">


                        <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700">


                            Get Started


                        </button>


                    </Link>





                    <Link to="/login">


                        <button className="px-8 py-3 rounded-lg border border-gray-600 hover:bg-gray-800">


                            Login


                        </button>


                    </Link>




                </div>


            </section>









            {/* FEATURES */}


            <section className="px-8 py-16">


                <h2 className="text-3xl font-bold text-center mb-12">


                    Platform Capabilities


                </h2>





                <div className="grid md:grid-cols-4 gap-6">





                    <Feature

                        icon="🤖"

                        title="AI Prediction"

                        text="Machine learning models analyze environmental factors and calculate risk levels."

                    />





                    <Feature

                        icon="🛰"

                        title="Satellite Intelligence"

                        text="Monitor vegetation, rainfall patterns, and environmental changes."

                    />





                    <Feature

                        icon="🗺"

                        title="Risk Mapping"

                        text="Interactive maps display environmental risks across Kenya."

                    />





                    <Feature

                        icon="🌦"

                        title="Climate Data"

                        text="Combine weather and vulnerability indicators for better decisions."

                    />



                </div>



            </section>









            {/* WORKFLOW */}


            <section className="px-8 py-16 bg-gray-900">


                <h2 className="text-3xl font-bold text-center mb-10">


                    How SentinelAI Works


                </h2>






                <div className="grid md:grid-cols-4 gap-6 text-center">



                    <Step

                        number="1"

                        text="Choose location"

                    />



                    <Step

                        number="2"

                        text="Collect environmental data"

                    />



                    <Step

                        number="3"

                        text="AI predicts risk"

                    />



                    <Step

                        number="4"

                        text="View actionable insights"

                    />



                </div>



            </section>









            {/* FOOTER CTA */}


            <section className="text-center px-8 py-16">


                <h2 className="text-3xl font-bold mb-5">


                    Protect communities with better intelligence.


                </h2>





                <Link to="/register">


                    <button className="px-10 py-4 bg-green-600 rounded-lg">


                        Create Free Account


                    </button>


                </Link>



            </section>






        </div>

    );

}







function Feature({

    icon,

    title,

    text

}:{

    icon:string;

    title:string;

    text:string;

}){


    return (

        <div className="bg-gray-900 p-6 rounded-xl">


            <div className="text-4xl mb-4">

                {icon}

            </div>



            <h3 className="text-xl font-bold mb-3">

                {title}

            </h3>




            <p className="text-gray-400">

                {text}

            </p>



        </div>

    );

}









function Step({

    number,

    text

}:{

    number:string;

    text:string;

}){


    return (

        <div>


            <div className="text-4xl font-bold text-blue-500">

                {number}

            </div>


            <p className="mt-3 text-gray-300">

                {text}

            </p>


        </div>

    );

}