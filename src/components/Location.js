import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Location = () => {
  const { dispatch } = useContext(AppContext);

  const changeLocation = (val) => {
    dispatch({
      type: "CHG_LOCATION",
      payload: val,
    });
  };

  return (
    <div className="alert alert-secondary">
      {" "}
      Location{" "}
      {
        <select
          name="Location"
          id="Location"
          onChange={(event) => changeLocation(event.target.value)}
        >
          <option value="£">Uk(£)</option>
          <option value="₹">India(₹)</option>
          <option value="€">Europe(€)</option>
          <option value="CAD">Canada(CAD)</option>
        </select>
      }
    </div>
  );
};

export default Location;
