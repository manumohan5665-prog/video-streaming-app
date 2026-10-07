import { Component } from "react";
import { TriangleAlert } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Streamly Error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-boundary-icon"><TriangleAlert size={20} strokeWidth={2} /></div>

                        <h1>Something went wrong</h1>

                        <p>
                            Streamly couldn't load this page correctly.
                            Please try again.
                        </p>

                        <button
                            type="button"
                            className="error-boundary-button"
                            onClick={this.handleReload}
                        >
                            Try Again
                        </button>
                    </div>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;