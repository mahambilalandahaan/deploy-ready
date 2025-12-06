let chatHistory = [];


function addBubble(text , sender) {
    const chat= document.getElementById("chat");
    const bubble = document.createElement("div");
    bubble.className = "bubble " + (sender === "user" ? "user" : "bot");
    bubble.innerText = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
      }
function sendMessage() {
    const message = document.getElementById("msg").value.trim();
    const role = document.getElementById("role").value;
    const style = document.getElementById("style").value;
    const length = document.getElementById("length").value;
    if (!message) return;

    // Show user message
    addBubble(message, "user");
    document.getElementById("msg").value = "";
   

    // Call FastAPI
    fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message ,
                                role : role,
                                style : style,
                                length : length,
                                 history: chatHistory
             })
           })
    .then(response => response.json())
    .then(data => {
        addBubble(data.reply, "bot");  // show bot response
        chatHistory.push([message , data.reply]);
    })
    .catch(error => {
        console.error("Error:", error);
        addBubble("Error: Could not reach server", "bot");
    });
    }

   
    