import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<AuthContextProvider>
					<SocketContextProvider>
						<App />
					</SocketContextProvider>
				</AuthContextProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
