import { Link } from "react-router-dom";



export default function LandingPage(){


    return (

        <div className="landing-page">


            <section className="hero">


                <h1>

                    SentinelAI

                </h1>



                <h2>

                    AI-Powered Environmental Risk Intelligence

                </h2>




                <p>

                    Predict environmental risks across Kenya using

                    artificial intelligence, satellite intelligence,

                    and climate data.

                </p>





                <div className="actions">


                    <Link to="/login">

                        <button>

                            Login

                        </button>

                    </Link>



                    <Link to="/register">

                        <button>

                            Create Account

                        </button>

                    </Link>


                </div>


            </section>







            <section className="features">


                <h2>

                    Platform Capabilities

                </h2>



                <div className="feature-grid">


                    <div className="feature-card">

                        <h3>

                            🤖 AI Prediction

                        </h3>

                        <p>

                            Machine learning models analyze

                            environmental conditions and estimate

                            risk levels.

                        </p>

                    </div>






                    <div className="feature-card">

                        <h3>

                            🛰 Satellite Intelligence

                        </h3>

                        <p>

                            Monitor vegetation, rainfall patterns,

                            and environmental changes.

                        </p>

                    </div>







                    <div className="feature-card">

                        <h3>

                            🗺 Risk Mapping

                        </h3>

                        <p>

                            Visualize risk locations across Kenya

                            using interactive maps.

                        </p>

                    </div>








                    <div className="feature-card">

                        <h3>

                            🌦 Climate Monitoring

                        </h3>

                        <p>

                            Combine weather and vulnerability data

                            for better decisions.

                        </p>

                    </div>



                </div>


            </section>







            <section className="workflow">


                <h2>

                    How SentinelAI Works

                </h2>



                <ol>


                    <li>

                        Select a Kenyan location

                    </li>



                    <li>

                        AI collects environmental indicators

                    </li>



                    <li>

                        Machine learning predicts risk

                    </li>



                    <li>

                        Users receive actionable insights

                    </li>



                </ol>


            </section>







        </div>

    );

}