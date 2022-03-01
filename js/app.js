// Import Html ID/item
const Items_ID = document.getElementById("Items");
const Item_Details = document.getElementById("Item_Details");
const InputField_ID = document.getElementById("InputField");
//Using variables for a better future update
let inputText = null;

// variables for control item numbers
let start = 1,
  NotShowAll = true;

// Load search data
const LoadItem = () => {
  Items_ID.innerHTML = "";
  Item_Details.innerHTML = "";
  document.getElementById("Spinner").style.display = "block";
  document.getElementById("Item_Details").style.display = "none";
  inputText = InputField_ID.value;

  const URL = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayMobile(data.data));
};

// display search data
const displayMobile = (Items) => {
  //No result found
  if (Items.length === 0) {
    document.getElementById("Item_Details").style.display = "none";
    document.getElementById("Spinner").style.display = "none";
    alert("No result found");
  } else {
    // control item numbers
    start = 1;
    Items.forEach((Item) => {
      if (start > 20 && NotShowAll === true) {
        document.getElementById("Spinner").style.display = "none";
        return;
      }
      const div = document.createElement("div");
      div.classList.add("MyCard");
      div.innerHTML = `       
      <div class="image_height">
        <img src="${Item.image}" class="my-img-fluid" alt="picture" />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">${Item.phone_name}</h5>
        <p class="card-text text-center">
        ${Item.brand}
        </p>
        <a 
        href="#" 
        class="btn btn-primary d-flex justify-content-center" 
        onclick="LoadDetails('${Item.slug}')"
        >Details</a>
      </div>
   `;

      Items_ID.appendChild(div);
      start++;
    });
    document.getElementById("Spinner").style.display = "none";
    // Return to normal after showing all search data
    if (NotShowAll === false) {
      document.getElementById("ShowAll").style.display = "none";
      //Return to normal for further search
      NotShowAll = true;
    } else {
      document.getElementById("ShowAll").style.display = "block";
    }
  }
};

// load product details
const LoadDetails = (id) => {
  Item_Details.innerHTML = "";
  document.getElementById("Spinner").style.display = "block";
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

// display product details
const displayDetails = (Item) => {
  const div = document.createElement("div");

  div.innerHTML = `       
      <div class="image_height2">
      <img
        src="${Item.image}"
        class="my-img-fluid"
        alt="picture"
      />
      <h2 style="margin: 10px 0px">${Item.name}</h2>
    </div>
    <br />
    <div class="">
      <table class="table border-primary w-100">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Brand</td>
            <td>${Item.brand}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>ReleaseDate</td>
            <td>${Item.releaseDate ? Item.releaseDate : "No Date found"}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ChipSet</td>
            <td>${Item.mainFeatures.chipSet}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>DisplaySize</td>
            <td>${Item.mainFeatures.displaySize}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Storage</td>
            <td>${Item.mainFeatures.storage}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Sensors</td>
            <td>${Item.mainFeatures.sensors}</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Others</td>
            <td>WLAN: ${Item.others.WLAN}, <br />
            Bluetooth: ${Item.others.Bluetooth}, <br />
            GPS: ${Item.others.GPS},  <br />
            NFC: ${Item.others.NFC}, <br />
            Radio: ${Item.others.Radio}, <br />
            USB: ${Item.others.USB}</td> <br />
          </tr>
        </tbody>
      </table>
    </div>
   `;

  Item_Details.appendChild(div);

  document.getElementById("Item_Details").style.display = "block";
  document.getElementById("Spinner").style.display = "none";
};

const Show_All = () => {
  NotShowAll = false;
  LoadItem();
};

// Hidden sections when loading first
document.getElementById("Spinner").style.display = "none";
document.getElementById("Item_Details").style.display = "none";
document.getElementById("ShowAll").style.display = "none";
