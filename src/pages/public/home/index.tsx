import { Fragment } from "react";
import Hero from "../../../components/home/Hero";
import Banner from "../../../components/home/Banner";
import Download from "../../../components/home/Download";
// import Recommendation from "../../../components/recommendation";
import Destinations from "../../../components/home/Destinations";
import Popular from "../../../components/home/Popular";
// import Offers from "../../../components/Offers";

function HomePage() {
    return (
        <Fragment>
            <Hero />

            <Banner />

            <Destinations />

            {/* <Recommendation /> */}

            {/* <Offers /> */}

            <Download />

            <Popular />
        </Fragment>
    );
}

export default HomePage;
