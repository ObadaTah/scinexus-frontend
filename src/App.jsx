import { useState } from "react";
import { getData } from "./ApiFetcher";
import Footer from "./Components/Generic/Footer";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
    const [apiData, setApiData] = useState();

    // useEffect(() => {
    //     // getData("academics")
    //     //     .then((data) => {
    //     //         setApiData(data);
    //     //         console.log(apiData);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error("Error while fetching data:", error);
    //     //     });
    // }, []);
    return (
        <>
            <SignUp />
        </>
    );
}

export default App;
