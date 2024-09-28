import "./content.css";

function initialize() {
    const chatContainer = createChatContainer();
    const inputMessageField = createInputMessageField();
    const sendButton = createSendButton();
    const speechButton = createSpeechToTextButton();

    chatContainer.appendChild(inputMessageField);
    chatContainer.appendChild(speechButton);
    chatContainer.appendChild(sendButton);

    document.body.appendChild(chatContainer);
    setupSpeechRecognition(inputMessageField, speechButton);
    onSendButtonClick(inputMessageField, sendButton)
}

function createChatContainer(): HTMLDivElement {
    const chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.classList.add("chat-container");
    return chatContainer;
}

function createInputMessageField(): HTMLInputElement {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "chat-input";
    inputField.placeholder = "Type your message here...";
    inputField.classList.add('chat-container__message-input');
    return inputField;
}

function createSendButton(): HTMLButtonElement {
    const micButton = document.createElement("button");
    micButton.id = "mic-button";
    micButton.innerText = "🎤";
    micButton.classList.add('chat-container__send-button')
    return micButton;
}

function createSpeechToTextButton(): HTMLButtonElement {
    const sendButton = document.createElement("button");
    sendButton.id = "send-button";
    sendButton.innerText = "Send";
    sendButton.classList.add('chat-container__speech-button')
    return sendButton;
}

function buildChatContainer(): void {
    const chatContainer = createChatContainer();
    const inputMessageField = createInputMessageField();
    const sendButton = createSendButton();
    const speechButton = createSpeechToTextButton();

    chatContainer.appendChild(inputMessageField);
    chatContainer.appendChild(speechButton);
    chatContainer.appendChild(sendButton);

    document.body.appendChild(chatContainer);
}

function setupSpeechRecognition(inputMessageField: HTMLInputElement, micButton: HTMLButtonElement): void {
    let recognition: SpeechRecognition | null = null;
    let isRecording = false;

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        if (recognition) {
            recognition.continuous = false;
            recognition.lang = "en-US";

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                inputMessageField.value = transcript;
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
            };

            recognition.onend = () => {
                isRecording = false;
                micButton.innerText = "🎤";
            };
        }
    } else {
        console.warn("Speech Recognition API not supported in this browser.");
        micButton.disabled = true;
    }

    micButton.addEventListener("click", () => {
        if (recognition && !isRecording) {
            recognition.start();
            isRecording = true;
            micButton.innerText = "🛑";
        } else if (recognition && isRecording) {
            recognition.stop();
        }
    });
}

function onSendButtonClick(messageInputField: HTMLInputElement, sendButton: HTMLButtonElement): void {
    sendButton.addEventListener("click", () => {
        const message = messageInputField.value.trim();
        if (message) {
            // Make GET request to <apiurl.com>
            fetch(`https://apiurl.com?message=${encodeURIComponent(message)}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("API Response:", data);
                    // You can handle the response data here
                })
                .catch((error) => {
                    console.error("Error fetching API:", error);
                });

            messageInputField.value = "";
        }
    });
}

initialize();
