import "./App.css";
import RebelFoods from "./RebelFoods/src/App";
import { Provider } from "react-redux";
import store from "./RebelFoods/src/Store/store";

function App() {
  // const currentDomain = window.location.host;

  return (
    <div>
      {/* Routes for Domain 1 */}
      {/* {currentDomain === "10.10.1.2:3000" && (
            <> */}
      {/* <App1 /> */}
      {/* </>
          )} */}
      {/* Routes for Domain 2 */}
      {/* {currentDomain === "10.10.1.2:3001" && (
            <> */}
      <Provider store={store}>
        <RebelFoods />
      </Provider>

      {/* </>
          )} */}
    </div>
  );
}

export default App;
