var form = document.getElementById("my-form");

var onloadCallback = function() {
    alert("grecaptcha is ready!");
  };

async function handleSubmit(event) {
event.preventDefault();
if (!form.reportValidity()) {
return;
}
var status = document.getElementById("my-form-status");
var data = new FormData(event.target);
fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
}).then(response => {
    if (response.ok) {
    status.innerHTML = "Votre message a été envoyé !";
    form.reset();
    } else {
    response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
        status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
        status.innerHTML = "Veuillez valider le reCAPTCHA"
        }
    })
    }
}).catch(error => {
    status.innerHTML = "Une erreur est survenue. Veuillez réessayer."
});
}

form.addEventListener("submit", handleSubmit);