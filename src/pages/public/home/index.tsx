import { Fragment } from "react";
import Hero from "../../../components/home/Hero";
import BookingSearch from "../../../components/home/BookingSearch";
import Banner from "../../../components/home/Banner";
import Download from "../../../components/home/Download";
import Recommendation from "../../../components/recommendation";
// import Offers from "../../../components/Offers";

function HomePage() {
    return (
        <Fragment>
            {/* Display the Hero component */}
            <Hero />

            {/* Display the BookingSearch component */}
            <BookingSearch />

            {/* Display the Banner component */}
            <Banner />

            {/* Display the Recommendation component */}
            <Recommendation />

            {/* <Offers /> */}

            {/* Display the Download component */}
            <Download />
        </Fragment>
    );
}

export default HomePage;
