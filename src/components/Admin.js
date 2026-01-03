import React, { useState, useEffect, useCallback } from "react";
import "../styles/Admin.css";

function Admin() {
  // --- State Variables ---
  const [files, setFiles] = useState([]);
  const [section, setSection] = useState("team");
  
  // Team Member fields
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [information, setInformation] = useState("");
  const [team, setTeam] = useState("AllInvestment Team");
  const [order, setOrder] = useState("");
  
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
  
  // Edit mode state
  const [editingItemId, setEditingItemId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    
    // Clear all fields and exit edit mode
    clearForm();
    cancelEdit();
    
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // --- Clear Form Helper ---
  const clearForm = () => {
    setName("");
    setFirstName("");
    setLastName("");
    setPosition("");
    setInformation("");
    setTeam("AllInvestment Team");
    setOrder("");
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
          requiresPosition: true,
          requiresInformation: true,
          requiresTeam: true,
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

  // --- Edit Mode Functions ---
  const startEdit = (item) => {
    setIsEditing(true);
    setEditingItemId(item._id);
    
    if (section === "team") {
      setName(item.name || "");
      setFirstName(item.firstName || "");
      setLastName(item.lastName || "");
      setPosition(item.position || "");
      setInformation(item.information || "");
      setTeam(item.team || "AllInvestment Team");
      setOrder(item.order !== undefined ? item.order : "");
    } else if (section === "news") {
      setTitle(item.title || "");
      setNewsDate(item.newsDate ? new Date(item.newsDate).toISOString().split('T')[0] : "");
      setContent(item.content || "");
    } else if (section === "portfolio") {
      setCompanyName(item.companyName || "");
      setDescription(item.description || "");
      setIndustry(item.industry || "");
      setInitialInvestment(item.initialInvestment ? new Date(item.initialInvestment).toISOString().split('T')[0] : "");
      setHeadquarters(item.headquarters || "");
      setAcquisitions(item.acquisitions || 0);
      setStatus(item.status || "");
      setFund(item.fund || "");
    }
    
    setMessage(`✏️ Editing mode active. Modify fields and click "Update" to save changes.`);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItemId(null);
    clearForm();
  };

  // --- File Upload/Update Logic ---
  const handleUpload = async () => {
    const fieldInfo = getFieldInfo();

    // Validation based on section
    if (section === "team") {
      if (!isEditing && (!files || files.length === 0)) {
        setMessage("❌ Please select a team member photo!");
        return;
      }
      if (!name.trim() && (!firstName.trim() || !lastName.trim())) {
        setMessage("❌ Please enter the team member name or first/last name");
        return;
      }
      if (!position.trim()) {
        setMessage("❌ Please enter the team member position");
        return;
      }
      if (!information.trim()) {
        setMessage("❌ Please enter the team member bio/information");
        return;
      }
      if (!team.trim()) {
        setMessage("❌ Please select a team");
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

    // Prepare Upload/Update
    setIsUploading(true);
    setMessage(isEditing ? "⏳ Updating..." : "⏳ Uploading...");
    
    try {
      let endpoint;
      let requestBody;
      let method = isEditing ? "PUT" : "POST";
      let isFormData = false;

      if (section === "team") {
        endpoint = isEditing 
          ? `${API_BASE_URL}/team/${editingItemId}`
          : `${API_BASE_URL}/team/upload`;
        
        const formData = new FormData();
        
        if (name.trim()) {
          formData.append("name", name.trim());
        } else {
          formData.append("firstName", firstName.trim());
          formData.append("lastName", lastName.trim());
          formData.append("name", `${firstName.trim()} ${lastName.trim()}`);
        }
        
        formData.append("position", position.trim());
        formData.append("information", information.trim());
        formData.append("team", team.trim());
        
        if (order !== "") {
          formData.append("order", parseInt(order));
        }
        
        if (files && files.length > 0) {
          formData.append("image", files[0]);
        }
        
        requestBody = formData;
        isFormData = true;
      } else if (section === "news") {
        endpoint = isEditing 
          ? `${API_BASE_URL}/news/${editingItemId}`
          : `${API_BASE_URL}/news/upload`;
        
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
        endpoint = isEditing 
          ? `${API_BASE_URL}/portfolio/${editingItemId}`
          : `${API_BASE_URL}/portfolio`;
        
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
        if (isEditing) {
          setMessage(`✅ Update successful! Item updated in "${section}" section.`);
          
          // Update item in list
          const updatedItem = data.teamMember || data.news || data.portfolio;
          if (updatedItem) {
            setItems(prevItems =>
              prevItems.map(item => item._id === editingItemId ? updatedItem : item)
            );
          }
          
          cancelEdit();
        } else {
          setMessage(`✅ Upload successful! Item saved in "${section}" section.`);
          
          // Add new item to list
          const newItem = data.teamMember || data.news || data.portfolio;
          if (newItem) {
            setItems(prevItems => [newItem, ...prevItems]);
          }
        }

        // Clear form fields
        clearForm();

        // Refresh stats and items
        loadItems();
        loadStats();
      } else {
        setMessage(`❌ ${isEditing ? 'Update' : 'Upload'} failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(`${isEditing ? 'Update' : 'Upload'} error:`, err);
      setMessage(`❌ ${isEditing ? 'Update' : 'Upload'} failed: Network error. Make sure the server is running.`);
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
      
      let itemsArray = data.teamMembers || data.news || data.portfolio || [];
      
      // For team members, items are already sorted by order from backend (ascending: 1, 2, 3...)
      // No need to re-sort, backend already handles it
      
      setItems(itemsArray);
    } catch (err) {
      console.error("Error loading items:", err);
      setItems([]);
    }
  }, [section]);

  // --- Fetching Upload Statistics ---
  const loadStats = useCallback(async () => {
    try {
      const sections = ["team", "portfolio"];
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
        
        // If we were editing this item, cancel edit mode
        if (editingItemId === itemId) {
          cancelEdit();
        }
        
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
        <h3 className="form-title">
          {isEditing ? '✏️ Edit Item' : '📤 Add New Item'}
        </h3>
        
        {isEditing && (
          <div className="edit-mode-banner">
            <p>✏️ Editing mode active - Make changes and click "Update"</p>
            <button onClick={cancelEdit} className="cancel-edit-button">
              ❌ Cancel Edit
            </button>
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Section:</label>
          <select
            value={section}
            onChange={handleSectionChange}
            disabled={isUploading || isEditing}
            className="form-select"
          >
            <option value="team">👥 Team Members</option>
            <option value="portfolio">💼 Portfolio</option>
          </select>
        </div>

        {/* Team Member Fields */}
        {section === "team" && (
          <>
            <div className="form-group">
              <label className="form-label">Full Name * :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isUploading}
                className="form-input2"
                placeholder="Enter full name (e.g., John Doe)"
                maxLength={100}
              />
              <small className="form-hint">
                💡 Or use First Name + Last Name fields below
              </small>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isUploading}
                  className="form-input2"
                  placeholder="First name"
                  maxLength={50}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isUploading}
                  className="form-input2"
                  placeholder="Last name"
                  maxLength={50}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Position/Title * :</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={isUploading}
                className="form-input2"
                placeholder="e.g., Chief Investment Officer"
                maxLength={100}
              />
              <small className="form-hint">
                💡 Will be displayed in CAPS
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">Summary/Bio * :</label>
              <textarea
                value={information}
                onChange={(e) => setInformation(e.target.value)}
                disabled={isUploading}
                className="form-textarea"
                placeholder="Enter summary of position and biography"
                maxLength={5000}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Team * :</label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                disabled={isUploading}
                className="form-select"
              >
                <option value="AllInvestment Team">Investment Team</option>
                <option value="Operations Team">Operations Team</option>
                <option value="Advisory Board">Advisory Board</option>
              </select>
              <small className="form-hint">
                💡 Select which team this member belongs to
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">Display Order:</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                disabled={isUploading}
                className="form-input2"
                placeholder="e.g., 1, 2, 3... (lower numbers appear first)"
                min="0"
              />
              <small className="form-hint">
                💡 Lower numbers appear first (leave empty for default order)
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">
                {fieldInfo.imageLabel} {isEditing ? '(Optional - leave empty to keep current)' : '*'} :
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="form-file-input"
              />
              {isEditing && (
                <small className="form-hint">
                  💡 Upload a new image to replace the existing one
                </small>
              )}
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
                className="form-input2"
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
                className="form-input2"
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
              <small className="form-hint">
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
                className="form-input2"
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
              />
            </div>
            <div className="form-group">
              <label className="form-label">Industry * :</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={isUploading}
                className="form-input2"
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
                className="form-input2"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Headquarters * :</label>
              <input
                type="text"
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                disabled={isUploading}
                className="form-input2"
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
                className="form-input2"
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
                className="form-input2"
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
                className="form-input2"
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
              <small className="form-hint">
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
          {isUploading ? '⏳ Processing...' : isEditing ? '✅ Update' : '📤 Upload'}
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
                displayTitle = item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || "Untitled";
                displayDescription = item.position || "";
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
              
              const isCurrentlyEditing = editingItemId === item._id;
              
              return (
                <div key={item._id} className={`item-card ${isCurrentlyEditing ? 'editing' : ''}`}>
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
                      <div className="item-details">
                        {item.team && <p><strong>Team:</strong> {item.team}</p>}
                        {item.order !== undefined && <p><strong>Order:</strong> {item.order}</p>}
                        {item.position && <p><strong>Position:</strong> {item.position}</p>}
                        {item.information && <p><strong>Bio:</strong> {item.information.substring(0, 100)}{item.information.length > 100 ? '...' : ''}</p>}
                      </div>
                    )}
                    
                    {section === "news" && item.newsDate && (
                      <p className="item-image-count">
                        📅 {new Date(item.newsDate).toLocaleDateString()}
                      </p>
                    )}
                    
                    {section === "portfolio" && (
                      <div className="item-details">
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

                    <div className="item-actions">
                      <button
                        onClick={() => startEdit(item)}
                        className="edit-button"
                        disabled={isEditing}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item._id, displayTitle)}
                        className="delete-button"
                      >
                        🗑️ Delete
                      </button>
                    </div>
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