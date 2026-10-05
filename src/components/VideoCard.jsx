import { Link } from "react-router-dom";

function VideoCard({ video }) {
    return (
        <article className="video-card">

            {/* Thumbnail */}

            <Link to={`/video/${video.id}`} className="thumbnail-wrapper">

                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                />

                <span className="video-duration">
                    {video.duration}
                </span>

                <span className="thumbnail-play">
                    ▶
                </span>

            </Link>


            {/* Video Information */}

            <div className="video-info">

                <div className="creator-avatar">
                    {video.creator.charAt(0)}
                </div>

                <div className="video-details">

                    <Link
                        to={`/video/${video.id}`}
                        className="video-title"
                    >
                        {video.title}
                    </Link>

                    <p className="video-creator">
                        {video.creator}
                    </p>

                    <p className="video-meta">
                        {video.views} views • {video.uploaded}
                    </p>

                </div>

            </div>

        </article>
    );
}

export default VideoCard;