import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { locations } from '../data/locations';

export default function DetailPage() {
  const { id } = useParams();
  const location = locations.find((l) => String(l.id) === id);
  const [expandedImage, setExpandedImage] = useState(null);

  if (!location || !location.detailpage) {
    return (
      <div className="detail-page">
        <div className="detail-not-found">
          <p>Location not found.</p>
          <Link to="/" className="detail-back-link">← Back to map</Link>
        </div>
      </div>
    );
  }

  const { name, images = [], ...rest } = location.detailpage;

  // Separate and sort images by location
  const leftImages = images
    .filter((img) => img.location === 'left')
    .sort((a, b) => a.rank - b.rank);

  const rightImages = images
    .filter((img) => img.location === 'right')
    .sort((a, b) => a.rank - b.rank);

  const handleImageClick = (img) => {
    if (img.canResize) {
      setExpandedImage(img);
    }
  };

  const handleCloseModal = () => {
    setExpandedImage(null);
  };

  return (
    <div className="detail-page">
      <header className="detail-header">
        <Link to="/" className="detail-back-link">← Back to map</Link>
        <h1 className="detail-title">{name}</h1>
      </header>

      <main className="detail-body">
        <div className="detail-content-row">
          {/* Left Images Column */}
          {leftImages.length > 0 && (
            <div className="detail-images-column detail-images-left">
              {leftImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`detail-image-container ${img.canResize ? 'detail-image-container--clickable' : ''}`}
                  onClick={() => handleImageClick(img)}
                >
                  <img
                    src={`/images/${img.image}`}
                    alt={img.caption || name}
                    className="detail-image"
                  />
                  {img.caption && (
                    <div className="detail-image-caption">{img.caption}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Text Sections Column */}
          <div className="detail-sections-col">
            {Object.entries(rest).map(([key, value]) => (
              <section key={key} className="detail-section">
                <h2 className="detail-section-title">{key}</h2>
                {typeof value === 'string' ? (
                  <p className="detail-section-text">{value}</p>
                ) : (
                  <dl className="detail-dl">
                    {Object.entries(value).map(([subKey, subVal]) => (
                      <div key={subKey} className="detail-dl-row">
                        <dt className="detail-dt">{subKey}</dt>
                        <dd className="detail-dd">{subVal}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>

          {/* Right Images Column */}
          {rightImages.length > 0 && (
            <div className="detail-images-column detail-images-right">
              {rightImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`detail-image-container ${img.canResize ? 'detail-image-container--clickable' : ''}`}
                  onClick={() => handleImageClick(img)}
                >
                  <img
                    src={`/images/${img.image}`}
                    alt={img.caption || name}
                    className="detail-image"
                  />
                  {img.caption && (
                    <div className="detail-image-caption">{img.caption}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="image-modal-overlay" onClick={handleCloseModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={handleCloseModal}>✕</button>
            {expandedImage.caption && (
              <div className="image-modal-caption">{expandedImage.caption}</div>
            )}
            <img
              src={`/images/${expandedImage.image}`}
              alt={expandedImage.caption || name}
              className="image-modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
