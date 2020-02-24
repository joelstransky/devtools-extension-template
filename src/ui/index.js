const React = require("react");
const ReactDOM = require("react-dom");

const App = () => {
  console.log("APP");
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log("sending message...");
        }}
      >
        Send Message
      </button>
    </div>
  );
};
window.addEventListener("load", () => {
  ReactDOM.render(<App />, document.getElementById("container"));
  // send a 1-time message from content-script to
  chrome.runtime.sendMessage({ greeting: "hello-from-UI" }, response => {
    console.log(response.farewell);
  });
});
