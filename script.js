// ===============================
// EMAILJS INITIALIZATION
// ===============================
(function() {
    emailjs.init("Qq_T2SO6W86ENHSm0"); 
})();

// ===============================
// CHATBOT LOGIC
// ===============================

let step = 1;
let userIssue = "";
let userPhone = "";

function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");
    const message = input.value.trim();

    if (message === "") return;

    // Show user message
    chatBody.innerHTML += `<div class="message user">${message}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    const phoneRegex = /^[0-9]{10}$/;

    setTimeout(() => {

        if (step === 1) {
            userIssue = message;
            step = 2;

            chatBody.innerHTML += `
            <div class="message bot">
            Got it 👍 Please enter your 10-digit phone number.
            </div>`;
        }

        else if (step === 2) {

            if (phoneRegex.test(message)) {

                userPhone = message;
                step = 3;

                // SEND EMAIL
                emailjs.send("service_yh338mo", "template_spr25c9", {
                    name: "Website Customer",
                    phone: userPhone,
                    message: userIssue,
                    time: new Date().toLocaleString()
                })
                .then(function(response) {
                    console.log("Email sent successfully!", response.status);
                }, function(error) {
                    console.log("Email failed...", error);
                });

                chatBody.innerHTML += `
                <div class="message bot">
                ✅ Thank you! <br><br>
                Our plumber will contact you shortly.
                </div>`;
            } 
            else {
                chatBody.innerHTML += `
                <div class="message bot">
                Please enter a valid 10-digit phone number.
                </div>`;
            }
        }

        chatBody.scrollTop = chatBody.scrollHeight;

    }, 600);

    input.value = "";
}

// ===============================
// ENTER KEY SUPPORT
// ===============================
document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

