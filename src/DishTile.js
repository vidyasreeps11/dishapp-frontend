import React, { useState } from "react";
import "./DishTile.css";
import axios from "axios";

function DishTile(props) {
  var image = props.imageUrl;
  let id = props.dishId;

  var temp = props.isPublished;

  const [isPublished, setIsPublished] = useState(props.isPublished);

  // console.log("From dishtile: ", props.dishName, " ", props.isPublished);

  function handleButtonClick(e) {
    // e.preventDefault();

    if (e.target.value == "true") {
      setIsPublished(false);
      temp = false;
    } else if (e.target.value == "false") {
      setIsPublished(true);
      temp = true;
    }

    var updatedData = {
      dishId: id,
      dishName: props.dishName.toString(),
      imageUrl: props.imageUrl.toString(),
      isPublished: temp,
    };

    console.log(updatedData);
    //console.log(id); */

    var config = { headers: { "Content-Type": "application/json" } };
    let url = `http://localhost:8080/dishes/${id}`;

    axios
      .put(url, updatedData, config)
      .then((response) => console.log(response.status))
      .catch((error) => {
        console.log("Unable to update Data");
        console.error();
      });
  }
  return (
    <div className="dish_tile">
      <div
        className="image_box"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="dish_details">
        Dish Name : {props.dishName}
        <br></br>
        Published :{" "}
        <button
          onClick={handleButtonClick}
          title="click to change status"
          value={isPublished}
        >
          {isPublished.toString()}
        </button>
      </div>
    </div>
  );
}

export default DishTile;
