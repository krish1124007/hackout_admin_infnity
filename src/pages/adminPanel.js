import React, { useState, useEffect } from "react";

const API_BASE = "https://hackout2025-backend-infinity.onrender.com/api/v1/admin";

const SECTIONS = {
  USERS: "Users",
  HELP: "Help Requests",
  MAIL: "Mailing",
  AIAGENT:"Agent",
  UPLOAD: "File Upload",

};

export default function AdminPanel() {
  const [section, setSection] = useState(SECTIONS.USERS);
  const token = "";

  return (
    <div className="admin-container">
      <header className="navbar">
        <div className="logo">⚡ Admin Panel</div>
        <nav className="nav-links">
          {Object.entries(SECTIONS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSection(label)}
              className={section === label ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        {section === SECTIONS.USERS && <UsersSection token={token} />}
        {section === SECTIONS.HELP && <HelpSection token={token} />}
        {section === SECTIONS.MAIL && <MailSection token={token} />}
        {section === SECTIONS.AIAGENT && <AiAgentSection token={token} />}
        {section === SECTIONS.UPLOAD && <UploadSection token={token} />}
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: #f8fafc;
          color: #1e293b;
        }
        .admin-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Navbar */
        .navbar {
          background: #1e293b;
          color: white;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .logo {
          font-size: 1.3rem;
          font-weight: bold;
        }
        .nav-links button {
          background: transparent;
          border: none;
          color: #cbd5e1;
          margin-left: 12px;
          font-size: 0.95rem;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-links button:hover {
          background: rgba(255,255,255,0.15);
          color: white;
        }
        .nav-links button.active {
          background: #3b82f6;
          color: white;
          font-weight: 600;
        }

        /* Main */
        .main-content {
          flex: 1;
          margin: 20px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        h2 {
          margin-bottom: 16px;
          font-size: 1.3rem;
          font-weight: 600;
          color: #111827;
        }

        /* Table */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        th, td {
          padding: 12px 14px;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }
        th {
          background: #f1f5f9;
          font-weight: 600;
          color: #374151;
        }
        tr:nth-child(even) {
          background: #f9fafb;
        }

        /* Badge */
        .badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .badge.active {
          background: #d1fae5;
          color: #065f46;
        }
        .badge.inactive {
          background: #fee2e2;
          color: #991b1b;
        }

        /* Buttons */
        button {
          font-family: inherit;
        }
        .btn {
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn-block {
          background: #fef3c7;
          color: #92400e;
        }
        .btn-block:hover {
          background: #fde68a;
        }
        .btn-delete {
          background: #fecaca;
          color: #991b1b;
        }
        .btn-delete:hover {
          background: #f87171;
          color: white;
        }

        /* Forms */
        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        input:focus, textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }
        .form-btn {
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: background 0.2s;
          border: none;
        }
        .form-btn:hover {
          background: #2563eb;
        }

        /* Upload */
        .file-input {
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: flex;
            flex-wrap: wrap;
          }
          .nav-links button {
            margin: 6px 6px 0 0;
          }
          .main-content {
            margin: 10px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

/* --- Keep your components and logic unchanged --- */

function UsersSection({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/user/opreation/getalluser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.data.success) {
        setUsers(data.data.data);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/user/opreation/deleteuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert(data.message || "Delete failed");
      }
    } catch {
      alert("Network error");
    }
  };

  const handleBlock = async (id) => {
    if (!window.confirm("Block this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/user/opreation/blockuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map((u) => (u._id === id ? { ...u, is_active: false } : u)));
      } else {
        alert(data.message || "Block failed");
      }
    } catch {
      alert("Network error");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: "red", fontWeight: "500" }}>{error}</div>;

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Active</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td style={{ textAlign: "center" }}>
                <span className={`badge ${user.is_active ? "active" : "inactive"}`}>
                  {user.is_active ? "Yes" : "No"}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => handleBlock(user._id)}
                  disabled={!user.is_active}
                  className="btn btn-block"
                >
                  Block
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HelpSection({ token }) {
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHelps = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/displayhelp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.data.success) {
          setHelps(data.data.data); // yahan array set hoga
        } else {
          setError(data.message || "Failed to fetch help requests");
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    };
    fetchHelps();
  }, []);

  if (loading) return <div>Loading help requests...</div>;
  if (error) return <div style={{ color: "red", fontWeight: "500" }}>{error}</div>;

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Help Requests</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {helps.map((h) => (
          <li
            key={h._id}
            style={{
              marginBottom: "15px",
              padding: "15px",
              background: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ margin: "0 0 8px", fontWeight: "600" }}>
              {h.userdoubt}
            </p>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              <p style={{ margin: "4px 0" }}>
                <strong>User ID:</strong> {h.userId}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Status:</strong>{" "}
                <span style={{ color: h.solved ? "green" : "red" }}>
                  {h.solved ? "Solved" : "Unsolved"}
                </span>
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Created:</strong>{" "}
                {new Date(h.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


function MailSection({ token }) {
  const [toAll, setToAll] = useState("");
  const [toOne, setToOne] = useState({ email: "", content: "", subject: "" });
  const [message, setMessage] = useState("");

  const sendToAll = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/mailtomany`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: toAll, subject: "Announcement" }),
      });
      const data = await res.json();
      setMessage(data.message || (data.success ? "Mail sent" : "Failed to send mail"));
    } catch {
      setMessage("Network error");
    }
  };

  const sendToOne = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/mailtone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toOne),
      });
      const data = await res.json();
      setMessage(data.message || (data.success ? "Mail sent" : "Failed to send mail"));
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <div>
      <h2>Mailing</h2>
      <form onSubmit={sendToAll} style={{ marginBottom: "20px" }}>
        <h3>Send to All Users</h3>
        <textarea
          value={toAll}
          onChange={(e) => setToAll(e.target.value)}
          required
          rows={3}
        />
        <button type="submit" className="form-btn" style={{ marginTop: "10px" }}>
          Send to All
        </button>
      </form>

      <form onSubmit={sendToOne}>
        <h3>Send to One User</h3>
        <input
          type="email"
          placeholder="User Email"
          value={toOne.email}
          onChange={(e) => setToOne({ ...toOne, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={toOne.subject}
          onChange={(e) => setToOne({ ...toOne, subject: e.target.value })}
          required
          style={{ marginTop: "8px" }}
        />
        <textarea
          placeholder="Content"
          value={toOne.content}
          onChange={(e) => setToOne({ ...toOne, content: e.target.value })}
          required
          rows={3}
          style={{ marginTop: "8px" }}
        />
        <button type="submit" className="form-btn" style={{ marginTop: "10px" }}>
          Send to One
        </button>
      </form>

      {message && <div style={{ marginTop: "10px", color: "green" }}>{message}</div>}
    </div>
  );
}

function UploadSection({ token }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_BASE}/test/upload`, {
        method: "POST",
        headers: {},
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || (data.success ? "File uploaded" : "Failed to upload"));
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleUpload} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="file-input"
        />
        <button type="submit" className="form-btn">
          Upload
        </button>
      </form>
      {message && <div style={{ marginTop: "10px", color: "green" }}>{message}</div>}
    </div>
  );
}


function AiAgentSection() {
  // Dummy data for agents
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // yaha future me API se fetch kar sakte ho, abhi dummy data
    const dummyAgents = [
      {
        id: 1,
        name: "find-land-engine",
        model: "dipskill-lamma1-70b",
        tokensUsed: 12450,
        tokensRemaining: 87550,
        lastUpdated: "2025-08-28T12:30:00Z",
      },
      {
        id: 2,
        name: "helpreply ai agent",
        model: "dipskill-lamma1-70b",
        tokensUsed: 8420,
        tokensRemaining: 91580,
        lastUpdated: "2025-08-28T13:45:00Z",
      },
      {
        id: 3,
        name: "policy ai agent",
        model: "dipskill-lamma1-70b",
        tokensUsed: 16500,
        tokensRemaining: 83500,
        lastUpdated: "2025-08-29T09:15:00Z",
      },
      {
        id: 4,
        name: "subsd ai agent",
        model: "dipskill-lamma1-70b",
        tokensUsed: 20100,
        tokensRemaining: 79900,
        lastUpdated: "2025-08-29T11:00:00Z",
      },
      {
        id: 5,
        name: "transpot-plant ai agent",
        model: "dipskill-lamma1-70b",
        tokensUsed: 9500,
        tokensRemaining: 90500,
        lastUpdated: "2025-08-29T14:20:00Z",
      },
    ];

    setAgents(dummyAgents);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>AI Agents</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #e5e7eb",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={thStyle}>Agent Name</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Tokens Used</th>
            <th style={thStyle}>Tokens Remaining</th>
            <th style={thStyle}>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={tdStyle}>{a.name}</td>
              <td style={tdStyle}>{a.model}</td>
              <td style={tdStyle}>{a.tokensUsed.toLocaleString()}</td>
              <td style={tdStyle}>{a.tokensRemaining.toLocaleString()}</td>
              <td style={tdStyle}>
                {new Date(a.lastUpdated).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontWeight: "600",
  borderBottom: "2px solid #d1d5db",
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
};