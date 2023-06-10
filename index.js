// start by creating data so we don't have to type it in each time
let dataArray = [];
dataArray.push("first");
dataArray.push("second");
dataArray.push("third");

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getServerData")
    .addEventListener("click", function () {
      createList();
    });
});

function createList() {
  // run on Azure
  $.get(
    "https://viktoriarestaurantwriter.azurewebsites.net/api/viktoriarestaurantwriter",
    function (data, status) {
      dataArray = JSON.parse(data);
      console.log(dataArray);

      //clear prior data
      let table = document.getElementById("tableResult");
      table.innerHTML = ""; // remove previous data

      var header = table.createTHead();
      var hRow = header.insertRow(0);
      var hCell1 = hRow.insertCell(0);
      var hCell2 = hRow.insertCell(1);
      var hCell3 = hRow.insertCell(2);
      var hCell4 = hRow.insertCell(3);
      var hCell5 = hRow.insertCell(4);
      hCell1.innerHTML = "<b>Name</b>";
      hCell2.innerHTML = "<b>City</b>";
      hCell3.innerHTML = "<b>Cuisine</b>";
      hCell4.innerHTML = "<b>Stars</b>";
      hCell5.innerHTML = "<b>Poster</b>";

      for (let i = 0; i < dataArray.length; i++) {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = dataArray[i].name;
        cell2.innerHTML = dataArray[i].city;
        cell3.innerHTML = dataArray[i].cuisine;
        cell4.innerHTML = dataArray[i].stars;
        cell5.innerHTML = dataArray[i].poster;
      }
    }
  );
}
