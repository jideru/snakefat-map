import { useParams, Link } from 'react-router-dom';
import { locations } from '../data/locations';

export default function DetailPage() {
  const { id } = useParams();
  const location = locations.find((l) => String(l.id) === id);

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

  const { name, image, ...rest } = location.detailpage;

  return (
    <div className="detail-page">
      <header className="detail-header">
        <Link to="/" className="detail-back-link">← Back to map</Link>
        <h1 className="detail-title">{name}</h1>
      </header>

      <main className="detail-body">
        <div className="detail-content-row">
          {image && (
            <div className="detail-image-wrap">
              <img
                src={`/images/${image}`}
                alt={name}
                className="detail-image"
              />
            </div>
          )}

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
        </div>
      </main>
    </div>
  );
}
