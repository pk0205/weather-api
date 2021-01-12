console.log("Client side javascript file is loaded!");

const weathetForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weathetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.innerHTML = data.error;
        } else {
          message1.innerHTML = data.response.current.temperature;
        }
        // console.log(data.response);
      });
    }
  );
});
