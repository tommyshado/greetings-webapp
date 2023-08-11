const errorMessages = document.querySelector(".errorMsg").innerHTML;
const resetBtn = document.querySelector(".resetBtn");

if (errorMessages !== "") {
    setTimeout(() => errorMessages = "", 3000);
}

resetBtn.addEventListener("click", (event) => {
    if (!confirm("Do you want to reset the data?")) {
        event.preventDefault();
    };
});