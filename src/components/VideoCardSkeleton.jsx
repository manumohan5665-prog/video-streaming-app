function VideoCardSkeleton() {
    return (
        <article className="video-card-skeleton">
            <div className="skeleton-thumbnail"></div>

            <div className="skeleton-info">
                <div className="skeleton-avatar"></div>

                <div className="skeleton-details">
                    <div className="skeleton-line skeleton-title"></div>
                    <div className="skeleton-line skeleton-creator"></div>
                    <div className="skeleton-line skeleton-meta"></div>
                </div>
            </div>
        </article>
    );
}

export default VideoCardSkeleton;