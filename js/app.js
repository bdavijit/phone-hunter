const Items_ID = document.getElementById("Items");

const LoadItem = () => {
  Items_ID.innerHTML = "";
  document.getElementById("Spinner").style.display = "block";
  const InputField_ID = document.getElementById("InputField");
  const URL = `https://openapi.programming-hero.com/api/phones?search=${InputField_ID.value}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};



document.getElementById("Spinner").style.display = "none";
