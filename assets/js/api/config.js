---
---
export const baseurl = "{{ site.baseurl }}";

export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:8587";  // Same URI for localhost or 127.0.0.1
} else {
    pythonURI = "https://flask.opencodingsociety.com";

}

const ROBOP_LOCAL = "http://localhost:8320";
const ROBOP_PROD = "https://robop.opencodingsociety.com";
const isLocalHost = ["localhost", "127.0.0.1"].includes(location.hostname);

/**
 * Returns the correct Robop base URL.
 * - If frontend is running on localhost AND local backend responds, use localhost.
 * - Otherwise fall back to production.
 */
export async function getRobopURI() {
  if (isLocalHost) {
    try {
      // Any HTTP response (even 401) proves the backend is up.
      const r = await fetch(`${ROBOP_LOCAL}/api/robop/me`, {
        method: "GET",
        credentials: "omit",
      });
      if (r) return ROBOP_LOCAL;
    } catch (e) {
      // local backend is down -> fall back to prod
    }
  }
  return ROBOP_PROD;
}

// Keep compatibility if other files import robopURI directly:
// we set it asynchronously after module load.
export var robopURI = ROBOP_PROD;
getRobopURI().then((uri) => {
  robopURI = uri;
});


export var javaURI;
// 127.0.0.1:8585 does not work for some machines
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        javaURI = "http://localhost:8585";
} else {
    javaURI = "https://spring.opencodingsociety.com";
}

export const fetchOptions = {
    method: 'GET',  // Default method is GET
    mode: 'cors', // Enable CORS (Cross-Origin Resource Sharing)
    cache: 'default', // Default caching behavior
    credentials: 'include', // Include credentials (cookies, etc.)
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client' // Custom header to identify source
    },
};

// User Login Function (allows both GET and POST)
export function login(options) {
    // Modify the options to use the correct method and include the request body
    const requestOptions  = {
        ...fetchOptions,  // Spread the existing fetchOptions object
        method: options.method || 'POST',  // Dynamically set the method (default to POST)
        body: options.method === 'POST' ? JSON.stringify(options.body) : undefined  // Only add body for POST requests
    };

    // Clear the message area
    document.getElementById(options.message).textContent = "";

    // Fetch JWT from the server
    fetch(options.URL, requestOptions)
    .then(response => {
        // Trap error response from the Web API
        if (!response.ok) {
            const errorMsg = 'Login error: ' + response.status;
            console.log(errorMsg);
            document.getElementById(options.message).textContent = errorMsg;
            return response;  // Exit early if response is not OK
        }
        // Success: Proceed with callback
        options.callback();
    })
    .catch(error => {
        // Handle network errors
        console.log('Possible CORS or Service Down error: ' + error);
        document.getElementById(options.message).textContent = 'Possible CORS or service down error: ' + error;
    });
}
