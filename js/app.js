const Items_ID = document.getElementById("Items");

const LoadItem = () => {
  Items_ID.innerHTML = "";
  document.getElementById("Spinner").style.display = "block";
  const InputField_ID = document.getElementById("InputField");
  const URL = `https://openapi.programming-hero.com/api/phones?search=${InputField_ID.value}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayMobile(data.data));
};

const displayMobile = (Items) => {
  console.log(Items);

  if (Items === null) {
    document.getElementById("Spinner").style.display = "none";
    alert("No result found");
  } else {
    Items.forEach((Item) => {
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
        <a href="#" class="btn btn-primary d-flex justify-content-center">Details</a>
      </div>
   `;

      Items_ID.appendChild(div);
    });
    document.getElementById("Spinner").style.display = "none";
  }
};


document.getElementById("Spinner").style.display = "none";
