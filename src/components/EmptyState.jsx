import { Link } from "react-router-dom";
import { Mailbox } from 'lucide-react';

function EmptyState({
    icon = <Mailbox size={20} strokeWidth={2} />,
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