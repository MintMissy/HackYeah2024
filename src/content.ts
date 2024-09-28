import "./content.css";

function initialize() {
	// Create the chat container
	const chatContainer = document.createElement("div");
	chatContainer.id = "chat-container";

	// Apply styles to position it at the bottom
	chatContainer.style.position = "fixed";
	chatContainer.style.bottom = "0";
	chatContainer.style.left = "0";
	chatContainer.style.width = "100%";
	chatContainer.style.backgroundColor = "#f1f1f1";
	chatContainer.style.borderTop = "1px solid #ccc";
	chatContainer.style.zIndex = "9999";
	chatContainer.style.padding = "10px";

	// Create the input field
	const inputField = document.createElement("input");
	inputField.type = "text";
	inputField.id = "chat-input";
	inputField.placeholder = "Type your message here...";
	inputField.style.width = "80%";
	inputField.style.padding = "10px";

	// Create the speech-to-text button
	const micButton = document.createElement("button");
	micButton.id = "mic-button";
	micButton.innerText = "🎤";
	micButton.style.marginLeft = "10px";
	micButton.style.padding = "10px";

	// Create the send button
	const sendButton = document.createElement("button");
	sendButton.id = "send-button";
	sendButton.innerText = "Send";
	sendButton.style.marginLeft = "10px";
	sendButton.style.padding = "10px";

	// Append elements to the chat container
	chatContainer.appendChild(inputField);
	chatContainer.appendChild(micButton);
	chatContainer.appendChild(sendButton);

	// Append the chat container to the body
	document.body.appendChild(chatContainer);

	// Speech recognition setup
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
				inputField.value = transcript;
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

	// Event listeners
	micButton.addEventListener("click", () => {
		if (recognition && !isRecording) {
			recognition.start();
			isRecording = true;
			micButton.innerText = "🛑";
		} else if (recognition && isRecording) {
			recognition.stop();
		}
	});

	sendButton.addEventListener("click", () => {
		const message = inputField.value.trim();
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

			inputField.value = "";
		}
	});
}

initialize();
