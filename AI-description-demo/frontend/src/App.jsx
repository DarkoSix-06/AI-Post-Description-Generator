import { useState } from "react";
import { Sparkles, Zap, Clock, AlertCircle, Copy, Check } from "lucide-react";

const TONES = ["Professional", "Friendly", "Luxury", "Youthful"];
const ANGLES = ["Quality", "Value", "Speed", "Trust", "Offer", "Urgency"];
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8081";

export default function App() {
  const [type, setType] = useState("service");
  const [subcategory, setSubcategory] = useState("");
  const [tone, setTone] = useState("Professional");
  const [angle, setAngle] = useState("Quality");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function AngleIcon({ kind }) {
    if (kind === "Speed") return <Zap className="icon" />;
    if (kind === "Urgency") return <Clock className="icon" />;
    return <Sparkles className="icon" />;
  }

  async function generate() {
    if (!subcategory.trim()) return;
    setLoading(true);
    setResult("");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, subcategory, tone, angle })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
      const data = JSON.parse(text);
      setResult(data.description || "(empty)");
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }

  return (
    <div className="app">
      {/* Inline, single-file styles */}
      <style>{`
        :root{
          --bg1:#f8fafc; --bg2:#eff6ff; --bg3:#e0e7ff;
          --surface:#ffffff; --border:#e2e8f0; --muted:#64748b; --text:#0f172a;
          --primary1:#2563eb; --primary2:#4f46e5; --primary1h:#1d4ed8; --ring:rgba(37,99,235,.32);
          --red50:#fef2f2; --red200:#fecaca; --red700:#b91c1c;
          --blue50:#eff6ff; --blue200:#bfdbfe; --blue600:#2563eb;
          --slate700:#334155;
        }
        *{box-sizing:border-box}
        html,body,#root,.app{height:100%}
        body{margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;}
        .app{
          background: linear-gradient(135deg, var(--bg1), var(--bg2), var(--bg3));
          color: var(--text);
        }
        .shell{max-width:64rem;margin:0 auto;padding:0 1.5rem}
        .sticky-header{
          position:sticky; top:0; z-index:10;
          background: color-mix(in oklab, var(--surface) 80%, transparent);
          backdrop-filter:saturate(120%) blur(6px);
          border-bottom:1px solid color-mix(in oklab, var(--border) 80%, #fff);
        }
        .header-inner{display:flex;align-items:center;gap:.75rem;padding:1rem 0}
        .brand{
          display:grid;place-items:center;
          width:44px;height:44px;border-radius:12px;
          background: linear-gradient(90deg,var(--primary1),var(--primary2));
          box-shadow:0 10px 20px rgba(37,99,235,.25);
        }
        .title{margin:0;font-size:1.5rem;font-weight:800;
          background:linear-gradient(90deg,#0f172a,#475569);
          -webkit-background-clip:text;background-clip:text;color:transparent;
        }
        .subtitle{margin:0;color:var(--muted);font-size:.9rem}

        .page{padding:2rem 0 3rem}

        .panel{
          background:var(--surface); border:1px solid var(--border);
          border-radius:16px; box-shadow:0 10px 24px rgba(15,23,42,.06), 0 2px 6px rgba(15,23,42,.05);
          overflow:hidden; 
        }
        .pad{padding:2rem}
        .grid{display:grid; gap:1rem}
        .grid-2{display:grid; gap:1rem}
        @media (min-width: 768px){
          .grid-2{grid-template-columns:1fr 1fr}
        }

        .label{display:block;font-weight:700;color:var(--slate700);font-size:.92rem;margin-bottom:.35rem}
        .req{color:#ef4444}
        .choices{display:grid;grid-template-columns:repeat(3, minmax(0,1fr));gap:.75rem}
        .pill{
          border:2px solid var(--border);
          border-radius:14px;
          padding:1rem;
          background:#fff;
          color:#475569;
          font-weight:600;
          transition: .2s;
          cursor:pointer;
          text-transform:capitalize;
        }
        .pill:hover{border-color:#cbd5e1}
        .pill.active{border-color:var(--primary1);background:#eff6ff;color:#1d4ed8;box-shadow:0 6px 16px rgba(37,99,235,.15)}

        .input, .select{
          width:100%;padding:1rem;border:1px solid #cbd5e1;border-radius:12px;background:#fff;color:var(--text);
          outline:none;transition:border-color .2s, box-shadow .2s;
        }
        .input::placeholder{color:#94a3b8}
        .input:focus, .select:focus{border-color:var(--primary1); box-shadow:0 0 0 4px var(--ring)}

        .btn-primary{
          width:100%; display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1rem 1.25rem; border:0; border-radius:14px; font-weight:700; color:#fff;
          background-image:linear-gradient(90deg,var(--primary1),var(--primary2));
          box-shadow:0 10px 24px rgba(37,99,235,.25);
          cursor:pointer; transition:transform .12s ease, box-shadow .2s ease, filter .15s ease;
        }
        .btn-primary:hover{filter:brightness(1.03); transform:translateY(-1px) scale(1.01)}
        .btn-primary:active{transform:translateY(0)}
        .btn-primary:disabled{
          cursor:not-allowed; filter:none; box-shadow:none;
          background-image:linear-gradient(90deg,#cbd5e1,#94a3b8);
        }

        .icon{width:18px;height:18px}

        .result-head{display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1rem}
        .h3{margin:0;font-size:1.15rem;font-weight:800}
        .btn-copy{
          display:inline-flex; align-items:center; gap:.4rem;
          padding:.5rem .8rem; font-weight:600; font-size:.9rem;
          color:#334155; border:1px solid #cbd5e1; border-radius:10px; background:#fff;
          transition:.15s; cursor:pointer;
        }
        .btn-copy:hover{color:var(--blue600); border-color:#93c5fd}

        .result-box{
          min-height:6rem; padding:1rem 1.25rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;
          color:#0f172a; line-height:1.6; white-space:pre-wrap;
        }
        .empty{
          text-align:center; padding:3rem 1rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;
          color:var(--muted);
        }
        .empty .bigicon{width:48px;height:48px;margin:0 auto .6rem auto;color:#94a3b8}

        .alert{
          margin-top:1rem; display:flex; gap:.6rem; align-items:flex-start;
          background:var(--red50); border:1px solid var(--red200); border-radius:12px; padding:.9rem 1rem;
          color:var(--red700);
        }

        .tips{
          margin-top:1rem; background:var(--blue50); border:1px solid var(--blue200);
          border-radius:12px; padding:1rem; color:#1e3a8a;
          display:flex; gap:.6rem; align-items:flex-start;
        }
        .muted{color:var(--muted)}
        .spin{width:20px;height:20px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Header */}
      <div className="sticky-header">
        <div className="shell header-inner">
          <div className="brand"><Sparkles color="#fff" size={22} /></div>
          <div>
            <h1 className="title">AI Content Generator</h1>
            <p className="subtitle">Create compelling descriptions powered by Gemini AI • {API_BASE}</p>
          </div>
        </div>
      </div>

      <div className="shell page">
        {/* Main Form */}
        <div className="panel">
          <div className="pad">
            <div className="grid">
              {/* Type Selection */}
              <div>
                <label className="label">Content Type</label>
                <div className="choices">
                  {["service", "product", "property"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`pill ${type === t ? "active" : ""}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Input */}
              <div>
                <label className="label">
                  Subcategory <span className="req">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g., Car Wash, Phone Repair, House for Rent"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                />
              </div>

              {/* Tone and Angle */}
              <div className="grid-2">
                <div>
                  <label className="label">Tone</label>
                  <select className="select" value={tone} onChange={(e) => setTone(e.target.value)}>
                    {TONES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Marketing Angle</label>
                  <select className="select" value={angle} onChange={(e) => setAngle(e.target.value)}>
                    {ANGLES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                className="btn-primary"
                onClick={generate}
                disabled={!subcategory.trim() || loading}
              >
                {loading ? (
                  <>
                    <span className="spin" /> Generating...
                  </>
                ) : (
                  <>
                    <AngleIcon kind={angle} />
                    Generate Description
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="panel" style={{ marginTop: 24 }}>
          <div className="pad">
            <div className="result-head">
              <h3 className="h3">Generated Content</h3>
              {result && (
                <button className="btn-copy" type="button" onClick={copyToClipboard}>
                  {copied ? (<><Check className="icon" /> Copied!</>) : (<><Copy className="icon" /> Copy</>)}
                </button>
              )}
            </div>

            {result ? (
              <div className="result-box">{result}</div>
            ) : (
              <div className="empty">
                <Sparkles className="bigicon" />
                Your AI-generated content will appear here
              </div>
            )}

            {error && (
              <div className="alert" role="alert">
                <AlertCircle className="icon" />
                <div>
                  <div style={{ fontWeight: 700 }}>Generation Error</div>
                  <div className="muted" style={{ color: "#991b1b", marginTop: 4, fontSize: ".92rem" }}>
                    {error}
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="tips">
              <Sparkles className="icon" />
              <div style={{ fontSize: ".95rem" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Pro Tips</div>
                <div>Be specific with your subcategory for better results. Future updates will include location, pricing, and custom call-to-action options.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
