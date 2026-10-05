import { Link } from "react-router-dom";

function EmptyState({
    icon = "📭",
    title = "Nothing here yet",
    message = "There's nothing to show right now.",
    buttonText,
    buttonTo,
}) {
    return (
        <div className="empty-state">
            <div className="empty-icon">{icon}</div>

            <h3>{title}</h3>

            <p>{message}</p>

            {buttonText && buttonTo && (
                <Link
                    to={buttonTo}
                    className="empty-state-button"
                >
                    {buttonText}
                </Link>
            )}
        </div>
    );
}

export default EmptyState;