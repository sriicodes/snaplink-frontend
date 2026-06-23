import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0a0015;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  .bg {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 80% 60% at 60% 20%, rgba(120, 40, 200, 0.55) 0%, transparent 65%),
      radial-gradient(ellipse 60% 50% at 20% 80%, rgba(180, 60, 255, 0.3) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 90% 70%, rgba(80, 20, 160, 0.4) 0%, transparent 60%),
      #0a0015;
    padding: 0 0 80px 0;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 48px;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.3rem;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .logo span { color: rgba(180,120,255,0.9); }

  .nav-pill {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 100px;
    padding: 8px 20px;
    color: rgba(255,255,255,0.6);
    font-size: 0.85rem;
    font-family: 'DM Sans', sans-serif;
  }

  .hero {
    padding: 60px 48px 40px;
    text-align: center
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2.8rem, 6vw, 4.2rem);
    line-height: 1.05;
    color: #fff;
    letter-spacing: -2px;
    margin-bottom: 20px;
  }

  .hero h1 em {
    font-style: normal;
    color: rgba(190,140,255,0.95);
  }

  .hero p {
    font-size: 1rem;
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    letter-spacing: 0.2px;
    max-width: 500px;
    line-height: 1.7;
    margin: 0 auto;
    text-align: center;
  }

  .main {
    padding: 0 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr; padding: 0 20px; }
    .hero { padding: 40px 20px 30px; }
    nav { padding: 20px; }
  }

  .card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    padding: 28px;
    backdrop-filter: blur(10px);
  }

  .card-label {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(180,120,255,0.8);
    margin-bottom: 20px;
  }

  .input-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .url-input {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 14px 16px;
    color: #fff;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }

  .url-input::placeholder { color: rgba(255,255,255,0.25); }
  .url-input:focus { border-color: rgba(160,100,255,0.6); }

  .shorten-btn {
    width: 100%;
    background: linear-gradient(135deg, #8b3fff, #6020cc);
    border: none;
    border-radius: 12px;
    padding: 14px;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: opacity 0.2s, transform 0.1s;
  }

  .shorten-btn:hover { opacity: 0.88; }
  .shorten-btn:active { transform: scale(0.98); }
  .shorten-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .error-msg {
    color: rgba(255,120,120,0.9);
    font-size: 0.82rem;
    margin-top: 6px;
  }

  .result-box {
    margin-top: 20px;
    background: rgba(140,60,255,0.1);
    border: 1px solid rgba(140,60,255,0.25);
    border-radius: 14px;
    padding: 18px;
  }

  .result-label {
    font-size: 0.7rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(180,130,255,0.7);
    margin-bottom: 10px;
  }

  .result-url-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .result-url {
    color: rgba(200,160,255,1);
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    word-break: break-all;
  }

  .result-url:hover { color: #fff; }

  .copy-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    padding: 6px 14px;
    color: rgba(255,255,255,0.7);
    font-size: 0.8rem;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
  }

  .copy-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }

  .node-tag {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
  }

  .node-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(120,255,150,0.8);
    flex-shrink: 0;
  }

  .analytics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .refresh-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 5px 12px;
    color: rgba(255,255,255,0.4);
    font-size: 0.75rem;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
  }

  .refresh-btn:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.7); }

  .empty-state {
    text-align: center;
    color: rgba(255,255,255,0.2);
    font-size: 0.85rem;
    padding: 30px 0;
  }

  .url-list { display: flex; flex-direction: column; gap: 10px; }

  .url-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    gap: 10px;
    transition: background 0.15s;
  }

  .url-row:hover { background: rgba(255,255,255,0.06); }

  .url-code {
    color: rgba(180,130,255,0.95);
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    flex-shrink: 0;
  }

  .url-code:hover { color: #fff; }

  .url-original {
    color: rgba(255,255,255,0.35);
    font-size: 0.78rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    text-align: center;
  }

  .click-badge {
    background: rgba(140,60,255,0.15);
    border: 1px solid rgba(140,60,255,0.25);
    border-radius: 100px;
    padding: 3px 10px;
    font-size: 0.75rem;
    color: rgba(180,130,255,0.9);
    flex-shrink: 0;
  }
`;

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetchAnalytics(); }, []);

const fetchAnalytics = async () => {
  try {
    const res = await fetch("https://snaplink-xn19.onrender.com/analytics/top");
    const data = await res.json();
    setAnalytics(data);
  } catch {}
};

  const handleShorten = async () => {
    if (!url) return setError("Please enter a URL");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://snaplink-xn19.onrender.com/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
      fetchAnalytics();
    } catch {
      setError("Could not connect to backend");
    }
    setLoading(false);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="bg">
        <nav>
          <div className="logo">Snap<span>Link</span></div>
          
        </nav>

        <div className="hero">
          <h1>Shorten URLs.<br /><em>at scale</em></h1>
          <p>Distributed. Cached. Fault-tolerant.</p>
        </div>

        <div className="main">
          <div className="card">
            <div className="card-label">Paste your URL here</div>
            <div className="input-wrap">
              <input
                className="url-input"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              />
              <button className="shorten-btn" onClick={handleShorten} disabled={loading}>
                {loading ? "Shortening..." : "Shorten →"}
              </button>
            </div>
            {error && <p className="error-msg">{error}</p>}
            {result && (
              <div className="result-box">
                <div className="result-label">Your short URL</div>
                <div className="result-url-row">
                  <a href={result.short_url} target="_blank" rel="noreferrer" className="result-url">
                    {result.short_url}
                  </a>
                  <button className="copy-btn" onClick={() => copy(result.short_url)}>Copy</button>
                </div>
                <div className="node-tag">
                  <div className="node-dot"></div>
                  {result.assigned_node}
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <div className="analytics-header">
              <div className="card-label" style={{marginBottom: 0}}>Top URLs</div>
              <button className="refresh-btn" onClick={fetchAnalytics}>Refresh</button>
            </div>
            {analytics.length === 0 ? (
              <div className="empty-state">No URLs yet — shorten something!</div>
            ) : (
              <div className="url-list">
                {analytics.map((item) => (
                  <div className="url-row" key={item.short_code}>
                    <a
                      href={"http://localhost:8000/" + item.short_code}
                      target="_blank"
                      rel="noreferrer"
                      className="url-code"
                    >
                      /{item.short_code}
                    </a>
                    <span className="url-original">{item.original_url}</span>
                    <span className="click-badge">{item.click_count} clicks</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}