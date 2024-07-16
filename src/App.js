import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Heading from "./Heading";
import DishTile from "./DishTile";
import axios from "axios";

function App() {
  //const [isPublished, setIsPublished] = useState();
  const [isLoading, setIsLoading] = useState("false");
  const [dishList, setDishList] = useState([]);

  function fetchData() {
    setIsLoading("true");
    axios
      .get("http://localhost:8080/dishes/getAll")
      .then((result) => setDishList(result.data))
      .catch((error) => console.log(error));

    setIsLoading("false");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Heading></Heading>

      <br></br>

      {isLoading == "false" &&
        dishList.map((dish, index) => (
          <DishTile
            key={index}
            dishId={dish.dishId}
            dishName={dish.dishName}
            imageUrl={dish.imageUrl}
            isPublished={dish.published}
          ></DishTile>
        ))}
    </Fragment>
  );
}

export default App;
