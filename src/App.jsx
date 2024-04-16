import { useState, useEffect } from "react";
import { getData } from "./ApiFetcher";
import "./App.css";

function App() {
    const [apiData, setApiData] = useState();

    useEffect(() => {
        getData("academics")
            .then((data) => {
                setApiData(data);
                console.log(apiData);
            })
            .catch((error) => {
                console.error("Error while fetching data:", error);
            });
    }, []);
    return (
        <>
            <div></div>
        </>
    );
}

export default App;
