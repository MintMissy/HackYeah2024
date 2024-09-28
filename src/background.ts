chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "fetch_api") {
		fetch(request.url)
			.then((response) => response.json())
			.then((data) => {
				sendResponse({ data });
			})
			.catch((error) => {
				sendResponse({ error: error.toString() });
			});
		// Return true to indicate that we will send a response asynchronously
		return true;
	}
});
