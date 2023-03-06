class Chat {
    constructor() {
        this.widgetButton = document.querySelector(".chat-widget__side-text");
        this.chatWidget = document.querySelector(".chat-widget");
        this.chatMessages = document.querySelector(".chat-widget__messages");
        this.chatWidgetInput = document.querySelector(".chat-widget__input");
        this.chatMessagesContainer = document.querySelector(".chat-widget__messages-container");

        this.lastMessageTime = new Date();

        //make chat window active
        this.widgetButton.addEventListener("click", (e) => {
            this.chatWidget.classList.add("chat-widget_active");

            //checkActivity if chat window is active
            this.intervalIdx = setInterval(() => {this.checkActivity();}, 1000);
        });

        //if Enter -> create HTML content for chat-widget
        this.chatWidgetInput.addEventListener("keyup", (e) => {
            if (e.code == "Enter" && this.chatWidgetInput.value.trim() != "") {
                let date = new Date();
                let messages = `<div class="message message_client">
                                    <div class="message__time">` + date.getHours().toString().padStart(2, '0') + `:` + date.getMinutes().toString().padStart(2, '0') + `</div>
                                    <div class="message__text">` + this.chatWidgetInput.value + `</div>
                                </div>`;
                this.chatMessages.innerHTML += messages;

                //renew last date and reset input field
                this.lastMessageTime = date;
                this.chatWidgetInput.value = "";

                //get robot response
                let robotAnswer = `<div class="message">
                                    <div class="message__time">` + date.getHours().toString().padStart(2, '0') + `:` + date.getMinutes().toString().padStart(2, '0') + `</div>
                                    <div class="message__text">` + this.getRobotAnswer() + `</div>
                                </div>`;
                this.chatMessages.innerHTML += robotAnswer;
        
                //scroll to the end of chat window
                this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
        
                //clear previous interval and create new one
                clearInterval(this.intervalIdx);
                this.intervalIdx = setInterval(() => {this.checkActivity();}, 1000);      
            }
        });
    }

    getRobotAnswer() {
        let answers = [
            "Ваше мнение очень важно для вас",
            "До свидания",
            "Ой как интересно..",
            "Жизнь тяжела",
            "Напишите нам лучше завтра"
        ]
    
        let randomIdx = Math.floor(Math.random() * answers.length);
    
        return answers[randomIdx];
    }

    askSmth() {
        let date = new Date();
        let robotQuest = `<div class="message">
                                <div class="message__time">` + date.getHours().toString().padStart(2, '0') + `:` + date.getMinutes().toString().padStart(2, '0') + `</div>
                                <div class="message__text">Можно было тогда и не начинать</div>
                            </div>`;
        this.chatMessages.innerHTML += robotQuest;
        this.chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
    
    checkActivity() {
        let date = new Date();
    
        //if delay time is over 30 sec -> ask smth:)
        if ((date - this.lastMessageTime) / 1000 > 30) {
            clearInterval(this.intervalIdx);
            this.askSmth();
        }
    }
}

let chat = new Chat();
