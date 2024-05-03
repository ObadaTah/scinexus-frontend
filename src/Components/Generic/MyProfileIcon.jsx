import ASSETS from "../../assets/Assets";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
function MyProfileIcon() {
  // TBI get the profile pic if null then default
  // useEffect(() => {
  //     getData("users")
  //         .then((data) => {
  //             setApiData(data);
  //             console.log(apiData);
  //         })
  //         .catch((error) => {
  //             console.error("Error while fetching data:", error);
  //         });
  // }, []);
  return (
    <>
      <img
        style={{ width: "25px", margin: "5px" }}
        src={ASSETS.defaultprofilePicture}
        alt=""
      />
      <ExpandMoreIcon />
    </>
  );
}
export default MyProfileIcon;
