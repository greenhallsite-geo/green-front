import React, { useState, useEffect, useCallback } from "react";
import "../styles/Admin.css";

function Admin() {
  // --- State Variables ---
  const [files, setFiles] = useState([]);
  const [section, setSection] = useState("team");
  
  // Team Member fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState("");
  const [information, setInformation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // News fields
  const [title, setTitle] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [content, setContent] = useState("");
  
  // Portfolio fields
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [acquisitions, setAcquisitions] = useState(0);
  const [status, setStatus] = useState("");
  const [fund, setFund] = useState("");
  
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});

  const API_BASE_URL = "https://green-back-wgz9.onrender.com";

  // --- Handlers for Input Changes ---
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMessage("");
    if (selectedFiles.length > 0) {
      const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
      setMessage(`Selected: ${selectedFiles.length} image(s) (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
    }
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    setSection(newSection);
    
    // Clear all fields
    setName("");
    setRole("");
    setPosition("");
    setTeam("");
    setInformation("");
    setEmail("");
    setPhone("");
    setTitle("");
    setNewsDate("");
    setContent("");
    setCompanyName("");
    setDescription("");
    setIndustry("");
    setInitialInvestment("");
    setHeadquarters("");
    setAcquisitions(0);
    setStatus("");
    setFund("");
    setFiles([]);
    setMessage("");
    
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // --- Helper Function to Get Dynamic Labels ---
  const getFieldInfo = useCallback(() => {
    switch (section) {
      case "team":
        return { 
          requiresImage: true,
          requiresName: true,
          imageLabel: "Team Member Photo"
        };
      case "news":
        return { 
          requiresTitle: true,
          requiresNewsDate: true,
          requiresContent: true,
          imageOptional: true,
          imageLabel: "News Image (Optional)"
        };
      case "portfolio":
        return { 
          requiresImage: false,
          requiresCompanyName: true,
          requiresDescription: true,
          requiresIndustry: true,
          requiresInitialInvestment: true,
          requiresHeadquarters: true,
          requiresAcquisitions: true,
          requiresStatus: true,
          requiresFund: true,
          imageOptional: true,
          imageLabel: "Company Logo (Optional)"
        };
      default:
        return {};
    }
  }, [section]);

  // --- File Upload Logic ---
  const handleUpload = async () => {
    const fieldInfo = getFieldInfo();

    // Validation based on section
    if (section === "team") {
      if (!files || files.length === 0) {
        setMessage("❌ Please select a team member photo!");
        return;
      }
      if (!name.trim()) {
        setMessage("❌ Please enter the team member name");
        return;
      }
    }

    if (section === "news") {
      if (!title.trim()) {
        setMessage("❌ Please enter the news title");
        return;
      }
      if (!newsDate.trim()) {
        setMessage("❌ Please select the news date");
        return;
      }
      if (!content.trim()) {
        setMessage("❌ Please enter the news content");
        return;
      }
    }

    if (section === "portfolio") {
      if (!companyName.trim()) {
        setMessage("❌ Please enter the company name");
        return;
      }
      if (!description.trim()) {
        setMessage("❌ Please enter the description");
        return;
      }
      if (!industry.trim()) {
        setMessage("❌ Please enter the industry");
        return;
      }
      if (!initialInvestment.trim()) {
        setMessage("❌ Please select the initial investment date");
        return;
      }
      if (!headquarters.trim()) {
        setMessage("❌ Please enter the headquarters");
        return;
      }
      if (acquisitions === undefined || acquisitions === null || acquisitions === '') {
        setMessage("❌ Please enter the number of acquisitions");
        return;
      }
      if (!status.trim()) {
        setMessage("❌ Please enter the status");
        return;
      }
      if (!fund.trim()) {
        setMessage("❌ Please enter the fund");
        return;
      }
    }

    // Check file type for sections with images
    if (files && files.length > 0) {
      const allImages = files.every(f => f.type.startsWith('image/'));
      if (!allImages) {
        setMessage("❌ Please select only image files!");
        return;
      }
    }

    // Prepare Upload
    setIsUploading(true);
    setMessage("⏳ Uploading...");
    
    try {
      let endpoint;
      let requestBody;
      let method = "POST";
      let isFormData = false;

      if (section === "team") {
        endpoint = `${API_BASE_URL}/team/upload`;
        const formData = new FormData();
        formData.append("image", files[0]);
        formData.append("name", name.trim());
        if (role.trim()) formData.append("role", role.trim());
        if (position.trim()) formData.append("position", position.trim());
        if (team.trim()) formData.append("team", team.trim());
        if (information.trim()) formData.append("information", information.trim());
        if (email.trim()) formData.append("email", email.trim());
        if (phone.trim()) formData.append("phone", phone.trim());
        requestBody = formData;
        isFormData = true;
      } else if (section === "news") {
        endpoint = `${API_BASE_URL}/news/upload`;
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("newsDate", newsDate.trim());
        formData.append("content", content.trim());
        if (files && files.length > 0) {
          formData.append("image", files[0]);
        }
        requestBody = formData;
        isFormData = true;
      } else if (section === "portfolio") {
        endpoint = `${API_BASE_URL}/portfolio`;
        const formData = new FormData();
        formData.append("companyName", companyName.trim());
        formData.append("description", description.trim());
        formData.append("industry", industry.trim());
        formData.append("initialInvestment", initialInvestment.trim());
        formData.append("headquarters", headquarters.trim());
        formData.append("acquisitions", parseInt(acquisitions));
        formData.append("status", status.trim());
        formData.append("fund", fund.trim());
        if (files && files.length > 0) {
          formData.append("logo", files[0]);
        }
        requestBody = formData;
        isFormData = true;
      }

      // Make API Call
      const fetchOptions = {
        method: method,
        body: requestBody,
      };

      if (!isFormData) {
        fetchOptions.headers = {
          "Content-Type": "application/json",
        };
      }

      const res = await fetch(endpoint, fetchOptions);
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Upload successful! Item saved in "${section}" section.`);
        
        // Add new item to list
        const newItem = data.teamMember || data.news || data.portfolio;
        if (newItem) {
          setItems(prevItems => [newItem, ...prevItems]);
        }

        // Clear form fields
        setFiles([]);
        setName("");
        setRole("");
        setPosition("");
        setTeam("");
        setInformation("");
        setEmail("");
        setPhone("");
        setTitle("");
        setNewsDate("");
        setContent("");
        setCompanyName("");
        setDescription("");
        setIndustry("");
        setInitialInvestment("");
        setHeadquarters("");
        setAcquisitions(0);
        setStatus("");
        setFund("");
        
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }

        // Refresh stats and items
        loadItems();
        loadStats();
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed: Network error. Make sure the server is running.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- Fetching Items ---
  const loadItems = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/${section}`);
      if (!res.ok) {
        if (res.status === 404) {
          setItems([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      
      // Extract items based on section
      const itemsArray = data.teamMembers || data.news || data.portfolio || [];
      setItems(itemsArray);
    } catch (err) {
      console.error("Error loading items:", err);
      setItems([]);
    }
  }, [section]);

  // --- Fetching Upload Statistics ---
  const loadStats = useCallback(async () => {
    try {
      const sections = ["team", "news", "portfolio"];
      const newStats = {};
      
      for (const sec of sections) {
        try {
          const res = await fetch(`${API_BASE_URL}/${sec}`);
          if (res.ok) {
            const data = await res.json();
            const itemsArray = data.teamMembers || data.news || data.portfolio || [];
            newStats[sec] = itemsArray.length;
          }
        } catch (err) {
          console.error(`Error loading stats for ${sec}:`, err);
        }
      }
      
      setStats(newStats);
    } catch (err) {
      console.error("Error loading stats:", err);
      setStats({});
    }
  }, []);

  // --- Deleting an Item ---
  const deleteItem = async (itemId, displayName) => {
    if (!window.confirm(`Are you sure you want to delete "${displayName}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${section}/${itemId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ "${displayName}" deleted successfully!`);
        setItems(prevItems =>
          prevItems.filter(item => item._id !== itemId)
        );
        loadStats();
      } else {
        setMessage(`❌ Delete failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Delete failed: Network error.");
    }
  };

  // --- Effect Hooks ---
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Get field info
  const fieldInfo = getFieldInfo();

  // Section names mapping
  const sectionNames = {
    "team": "Team Members",
    "news": "News",
    "portfolio": "Portfolio"
  };

  // --- JSX Rendering ---
  return (
    <div className="admin-container">
      <h2 className="admin-title">💼 Greenhall Capital - Admin Panel</h2>
      
      {/* Stats Display */}
      <div className="stats-section">
        <h3 className="stats-title">📊 Items Count:</h3>
        {Object.keys(stats).length > 0 ? (
          <div className="stats-grid">
            {Object.entries(stats).map(([key, count]) => (
              <div key={key} className="stat-card">
                <strong>{sectionNames[key] || key}:</strong> {count} item(s)
              </div>
            ))}
          </div>
        ) : (
          <p className="no-stats">Statistics not available. Try uploading content!</p>
        )}
      </div>

      {/* Upload Form */}
      <div className="upload-form">
        <h3 className="form-title">📤 Add New Item</h3>
        
        <div className="form-group">
          <label className="form-label">Section:</label>
          <select
            value={section}
            onChange={handleSectionChange}
            disabled={isUploading}
            className="form-select"
          >
            <option value="team">👥 Team Members</option>
            <option value="news">📰 News</option>
            <option value="portfolio">💼 Portfolio</option>
          </select>
        </div>

        {/* Team Member Fields */}
        {section === "team" && (
          <>
            <div className="form-group">
              <label className="form-label">Name * :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="Enter team member name"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role (Optional):</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Managing Partner"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Position (Optional):</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Chief Investment Officer"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Team (Optional):</label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Investment Team"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bio/Information (Optional):</label>
              <textarea
                value={information}
                onChange={(e) => setInformation(e.target.value)}
                disabled={isUploading}
                className="form-textarea"
                placeholder="Enter team member bio or additional information"
                maxLength={5000}
                style={{ minHeight: '120px' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email (Optional):</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., john.doe@greenhallcapital.com"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone (Optional):</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., +1 (202) 765-3077"
                maxLength={50}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{fieldInfo.imageLabel} * :</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="form-file-input"
              />
            </div>
          </>
        )}

        {/* News Fields */}
        {section === "news" && (
          <>
            <div className="form-group">
              <label className="form-label">Title * :</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="Enter news title"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">News Date * :</label>
              <input
                type="date"
                value={newsDate}
                onChange={(e) => setNewsDate(e.target.value)}
                disabled={isUploading}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content * :</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isUploading}
                className="form-textarea"
                placeholder="Enter news content (can be long)"
                maxLength={50000}
                style={{ minHeight: '200px' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{fieldInfo.imageLabel}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="form-file-input"
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                💡 Image is optional for news articles
              </small>
            </div>
          </>
        )}

        {/* Portfolio Fields */}
        {section === "portfolio" && (
          <>
            <div className="form-group">
              <label className="form-label">Company Name * :</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Smartlink Group, LLC"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description * :</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
                className="form-textarea"
                placeholder="Enter company description"
                maxLength={5000}
                style={{ minHeight: '150px' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Industry * :</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Telecommunication Services"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Initial Investment Date * :</label>
              <input
                type="date"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                disabled={isUploading}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Headquarters * :</label>
              <input
                type="text"
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Annapolis, MD"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Acquisitions * :</label>
              <input
                type="number"
                value={acquisitions}
                onChange={(e) => setAcquisitions(parseInt(e.target.value) || 0)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., 1"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status * :</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Realized (July 2022) or Active"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Fund * :</label>
              <input
                type="text"
                value={fund}
                onChange={(e) => setFund(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Greenhall SPV"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{fieldInfo.imageLabel}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="form-file-input"
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                💡 Company logo is optional
              </small>
            </div>
          </>
        )}

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`upload-button ${isUploading ? 'disabled' : ''}`}
        >
          {isUploading ? '⏳ Uploading...' : '📤 Upload'}
        </button>

        {message && (
          <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Items List Display */}
      <div className="items-section">
        <h3 className="items-title">
          🖼️ {sectionNames[section]} Items ({items.length})
        </h3>
        
        {items.length > 0 ? (
          <div className="items-grid">
            {items.map((item) => {
              let displayTitle = "";
              let displayDescription = "";
              let mediaUrl = null;
              
              if (section === "team") {
                displayTitle = item.name || "Untitled";
                displayDescription = [item.role, item.position, item.team].filter(Boolean).join(" • ");
                mediaUrl = item.imageUrl;
              } else if (section === "news") {
                displayTitle = item.title || "Untitled";
                displayDescription = item.content || "";
                mediaUrl = item.imageUrl;
              } else if (section === "portfolio") {
                displayTitle = item.companyName || "Untitled";
                displayDescription = item.description || "";
                mediaUrl = item.logoUrl;
              }
              
              return (
                <div key={item._id} className="item-card">
                  {mediaUrl && (
                    <img
                      src={mediaUrl}
                      alt={displayTitle}
                      className="item-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.warn(`Failed to load image: ${mediaUrl}`);
                      }}
                    />
                  )}
                  
                  <div className="item-content">
                    <h4 className="item-title">{displayTitle}</h4>
                    
                    {section === "team" && (
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        {item.information && <p><strong>Bio:</strong> {item.information.substring(0, 100)}{item.information.length > 100 ? '...' : ''}</p>}
                        {item.email && <p><strong>Email:</strong> {item.email}</p>}
                        {item.phone && <p><strong>Phone:</strong> {item.phone}</p>}
                      </div>
                    )}
                    
                    {section === "news" && item.newsDate && (
                      <p className="item-image-count">
                        📅 {new Date(item.newsDate).toLocaleDateString()}
                      </p>
                    )}
                    
                    {section === "portfolio" && (
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        <p><strong>Industry:</strong> {item.industry}</p>
                        <p><strong>Initial Investment:</strong> {new Date(item.initialInvestment).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        <p><strong>Headquarters:</strong> {item.headquarters}</p>
                        <p><strong>Acquisitions:</strong> {item.acquisitions}</p>
                        <p><strong>Status:</strong> {item.status}</p>
                        <p><strong>Fund:</strong> {item.fund}</p>
                      </div>
                    )}
                    
                    {displayDescription && (
                      <p className="item-description">
                        {displayDescription.length > 150
                          ? `${displayDescription.substring(0, 150)}...`
                          : displayDescription
                        }
                      </p>
                    )}

                    <button
                      onClick={() => deleteItem(item._id, displayTitle)}
                      className="delete-button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-items">
            No items uploaded yet in "{sectionNames[section]}" section.
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;