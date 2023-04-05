
import { Component, ErrorInfo, ReactNode } from "react";

import "./ErrorBoundary.css";

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error:", error, errorInfo);
	}

	resetError = () => this.setState({ hasError: false });

	render() {
		if (this.state.hasError) {
			return (
				<p>Произошла ошибка</p>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
