const writerUrl = "https://viktoriarestaurantwriter.azurewebsites.net/api/viktoriarestaurantwriter";
const readerUrl = "https://viktoriarestaurantreader.azurewebsites.net/api/viktoriarestaurantreader";

// define a constructor to create  objects
const ReviewObject = function (name, city, cuisine, stars, poster) {
  this.name = name;
  this.city = city;
  this.cuisine = cuisine;
  this.stars = stars;
  this.poster = poster;
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getAllReviews")
    .addEventListener("click", function () {
      readReviews("all");
    });

  document.getElementById("getCityReviews")
    .addEventListener("click", function () {
      readReviews(document.getElementById("city").value);
    });

  document.getElementById("postreview")
    .addEventListener("click", function () {
      postNewReview();
    });
});

function postNewReview() {
  const newReview = new ReviewObject(
    document.getElementById("name").value,
    document.getElementById("city").value,
    document.getElementById("cuisine").value,
    parseInt(document.getElementById("stars").value),
    document.getElementById("poster").value
  );
  console.log("new review: " + JSON.stringify(newReview));

  $.ajax({
    url: writerUrl,
    type: "POST",
    data: JSON.stringify(newReview),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      console.log("postNewReview result: " + result);
      document.getElementById("name").value = "";
      document.getElementById("city").value = "";
      document.getElementById("cuisine").value = "";
      document.getElementById("stars").value = "";
      document.getElementById("poster").value = "";
    },
  });
}

function readReviews(city) {
  $.get(
    readerUrl + "?city=" + city,
    function (data, status) {
      console.log("readReviews request status: " + status);

      //clear prior data
      const table = document.getElementById("tableResult");
      table.innerHTML = "";

      const items = JSON.parse(data);
      const header = table.createTHead();
      const hRow = header.insertRow(0);
      const hCell1 = hRow.insertCell(0);
      const hCell2 = hRow.insertCell(1);
      const hCell3 = hRow.insertCell(2);
      const hCell4 = hRow.insertCell(3);
      const hCell5 = hRow.insertCell(4);
      hCell1.innerHTML = "<b>Name</b>";
      hCell2.innerHTML = "<b>City</b>";
      hCell3.innerHTML = "<b>Cuisine</b>";
      hCell4.innerHTML = "<b>Stars</b>";
      hCell5.innerHTML = "<b>Poster</b>";

      for (const item of items) {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        cell1.innerHTML = item.name;
        cell2.innerHTML = item.city;
        cell3.innerHTML = item.cuisine;
        cell4.innerHTML = item.stars;
        cell5.innerHTML = item.poster;
      }
    }
  );
}
