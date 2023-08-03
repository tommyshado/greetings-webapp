const errorMessages = document.querySelector("#errorMsg").innerHTML;

if (errorMessages !== "") {
    setTimeout(() => errorMessages = "", 3000);
}