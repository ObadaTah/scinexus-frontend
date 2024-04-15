import { useState, useEffect } from "react";
import { getData } from "./ApiFetcher";
import "./App.css";

function App() {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        getData("posts")
            .then((data) => {
                console.log(data);
                setApiData(data);
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
