import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Helper function to safely destroy Cloudinary resource
const safeCloudinaryDestroy = async (publicId, resourceType = 'image') => {
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (e) {
      console.warn(`Could not destroy Cloudinary asset ${publicId}:`, e);
    }
  }
};

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: 'dzwvcmqww',
  api_key: '797799578193472',
  api_secret: 'YwVZipOTw-PJOdaHazLqKnPHRjY',
});

// --- MONGODB CONFIGURATION ---
const MONGODB_URI = "mongodb+srv://greenhallsite_db_user:greenhallsite_db_password@cluster0.m1zcxjk.mongodb.net/?appName=Cluster0";
const PORT = process.env.PORT || 5001;

// --- MONGOOSE SCHEMAS ---

// 1. Team Members Schema
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  role: { type: String, required: false, trim: true }, // Optional
  position: { type: String, required: false, trim: true }, // Optional
  team: { type: String, required: false, trim: true }, // Optional - e.g., "Investment Team", "Operations Team"
  information: { type: String, required: false, trim: true }, // Optional - Bio/description
  email: { type: String, required: false, trim: true }, // Optional
  phone: { type: String, required: false, trim: true }, // Optional
  uploadDate: { type: Date, default: Date.now },
}, { timestamps: true });

// 2. News Schema
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  newsDate: { type: Date, required: true },
  content: { type: String, required: true, trim: true }, // Long text content
  imageUrl: { type: String, required: false }, // Optional image
  imagePublicId: { type: String, required: false }, // Optional
  uploadDate: { type: Date, default: Date.now },
}, { timestamps: true });

// 3. Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  industry: { type: String, required: true, trim: true },
  initialInvestment: { type: Date, required: true }, // Investment date
  headquarters: { type: String, required: true, trim: true },
  acquisitions: { type: Number, required: true, default: 0 },
  status: { type: String, required: true, trim: true }, // e.g., "Realized (July 2022)", "Active"
  fund: { type: String, required: true, trim: true }, // e.g., "Greenhall SPV"
  logoUrl: { type: String, required: false }, // Optional company logo
  logoPublicId: { type: String, required: false }, // Optional
  uploadDate: { type: Date, default: Date.now },
}, { timestamps: true });

// --- MODELS ---
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
const News = mongoose.model('News', newsSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// --- EXPRESS APP SETUP ---
const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// --- DATABASE CONNECTION CHECK MIDDLEWARE ---
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: "Database unavailable", 
      message: "MongoDB connection is not ready. Please try again later." 
    });
  }
  next();
};

// --- CLOUDINARY MULTER SETUP FOR IMAGES ---
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'greenhall-capital',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'svg'],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
      return `${timestamp}-${safeName.split('.')[0]}`;
    },
  }
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// --- ROUTES ---

app.get("/", (req, res) => {
  res.json({
    message: "Greenhall Capital Backend API ✅",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ========== TEAM MEMBERS ROUTES ==========

app.post("/team/upload", checkDbConnection, uploadImage.single("image"), async (req, res) => {
  console.log('👥 Team member upload request');
  
  if (!req.file) {
    return res.status(400).json({ error: "Team member image is required" });
  }

  try {
    const { name, role, position, team, information, email, phone } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newTeamMember = new TeamMember({
      name: name.trim(),
      imageUrl: req.file.path,
      imagePublicId: req.file.filename,
      role: role?.trim() || '',
      position: position?.trim() || '',
      team: team?.trim() || '',
      information: information?.trim() || '',
      email: email?.trim() || '',
      phone: phone?.trim() || '',
    });

    await newTeamMember.save();
    console.log(`✅ Team member created: ${newTeamMember._id}`);

    res.status(201).json({
      message: "Team member created successfully!",
      teamMember: newTeamMember
    });

  } catch (error) {
    console.error('❌ Error creating team member:', error);
    res.status(500).json({ error: "Failed to create team member", details: error.message });
  }
});

app.get("/team", checkDbConnection, async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ uploadDate: -1 });
    res.json({ teamMembers });
  } catch (error) {
    console.error('❌ Error fetching team members:', error);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

app.get("/team/:id", checkDbConnection, async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json({ teamMember });
  } catch (error) {
    console.error('❌ Error fetching team member:', error);
    res.status(500).json({ error: "Failed to fetch team member" });
  }
});

app.put("/team/:id", checkDbConnection, uploadImage.single("image"), async (req, res) => {
  try {
    const { name, role, position, team, information, email, phone } = req.body;
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    // Update fields
    if (name) teamMember.name = name.trim();
    if (role !== undefined) teamMember.role = role.trim();
    if (position !== undefined) teamMember.position = position.trim();
    if (team !== undefined) teamMember.team = team.trim();
    if (information !== undefined) teamMember.information = information.trim();
    if (email !== undefined) teamMember.email = email.trim();
    if (phone !== undefined) teamMember.phone = phone.trim();

    // Update image if new one is uploaded
    if (req.file) {
      await safeCloudinaryDestroy(teamMember.imagePublicId);
      teamMember.imageUrl = req.file.path;
      teamMember.imagePublicId = req.file.filename;
    }

    await teamMember.save();
    console.log(`✅ Team member updated: ${req.params.id}`);

    res.json({ message: "Team member updated successfully", teamMember });
  } catch (error) {
    console.error('❌ Error updating team member:', error);
    res.status(500).json({ error: "Failed to update team member" });
  }
});

app.delete("/team/:id", checkDbConnection, async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    await safeCloudinaryDestroy(teamMember.imagePublicId);
    await TeamMember.findByIdAndDelete(req.params.id);
    console.log(`✅ Team member deleted: ${req.params.id}`);

    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error('❌ Error deleting team member:', error);
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

// ========== NEWS ROUTES ==========

app.post("/news/upload", checkDbConnection, uploadImage.single("image"), async (req, res) => {
  console.log('📰 News upload request');
  
  try {
    const { title, newsDate, content } = req.body;

    if (!title || !newsDate || !content) {
      return res.status(400).json({ error: "Title, news date, and content are required" });
    }

    // Handle optional image
    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
      console.log('📷 Image uploaded for news');
    } else {
      console.log('📝 News created without image');
    }

    const newNews = new News({
      title: title.trim(),
      newsDate: new Date(newsDate),
      content: content.trim(),
      imageUrl,
      imagePublicId,
    });

    await newNews.save();
    console.log(`✅ News created: ${newNews._id}`);

    res.status(201).json({
      message: "News created successfully!",
      news: newNews
    });

  } catch (error) {
    console.error('❌ Error creating news:', error);
    res.status(500).json({ error: "Failed to create news", details: error.message });
  }
});

app.get("/news", checkDbConnection, async (req, res) => {
  try {
    const news = await News.find().sort({ newsDate: -1 });
    res.json({ news });
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/news/:id", checkDbConnection, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json({ news });
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.put("/news/:id", checkDbConnection, uploadImage.single("image"), async (req, res) => {
  try {
    const { title, newsDate, content } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    // Update fields
    if (title) news.title = title.trim();
    if (newsDate) news.newsDate = new Date(newsDate);
    if (content) news.content = content.trim();

    // Update image if new one is uploaded
    if (req.file) {
      if (news.imagePublicId) {
        await safeCloudinaryDestroy(news.imagePublicId);
      }
      news.imageUrl = req.file.path;
      news.imagePublicId = req.file.filename;
    }

    await news.save();
    console.log(`✅ News updated: ${req.params.id}`);

    res.json({ message: "News updated successfully", news });
  } catch (error) {
    console.error('❌ Error updating news:', error);
    res.status(500).json({ error: "Failed to update news" });
  }
});

app.delete("/news/:id", checkDbConnection, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    // Only delete from Cloudinary if image exists
    if (news.imagePublicId) {
      await safeCloudinaryDestroy(news.imagePublicId);
    }
    
    await News.findByIdAndDelete(req.params.id);
    console.log(`✅ News deleted: ${req.params.id}`);

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error('❌ Error deleting news:', error);
    res.status(500).json({ error: "Failed to delete news" });
  }
});

// ========== PORTFOLIO ROUTES ==========

app.post("/portfolio", checkDbConnection, uploadImage.single("logo"), async (req, res) => {
  console.log('💼 Portfolio company create request');
  
  try {
    const { 
      companyName, 
      description, 
      industry, 
      initialInvestment, 
      headquarters, 
      acquisitions, 
      status, 
      fund 
    } = req.body;

    if (!companyName || !description || !industry || !initialInvestment || 
        !headquarters || acquisitions === undefined || !status || !fund) {
      return res.status(400).json({ 
        error: "All fields are required: companyName, description, industry, initialInvestment, headquarters, acquisitions, status, fund" 
      });
    }

    // Handle optional logo
    let logoUrl = null;
    let logoPublicId = null;

    if (req.file) {
      logoUrl = req.file.path;
      logoPublicId = req.file.filename;
      console.log('🏢 Logo uploaded for portfolio company');
    } else {
      console.log('📝 Portfolio company created without logo');
    }

    const newPortfolio = new Portfolio({
      companyName: companyName.trim(),
      description: description.trim(),
      industry: industry.trim(),
      initialInvestment: new Date(initialInvestment),
      headquarters: headquarters.trim(),
      acquisitions: parseInt(acquisitions),
      status: status.trim(),
      fund: fund.trim(),
      logoUrl,
      logoPublicId,
    });

    await newPortfolio.save();
    console.log(`✅ Portfolio company created: ${newPortfolio._id}`);

    res.status(201).json({
      message: "Portfolio company created successfully!",
      portfolio: newPortfolio
    });

  } catch (error) {
    console.error('❌ Error creating portfolio company:', error);
    res.status(500).json({ error: "Failed to create portfolio company", details: error.message });
  }
});

app.get("/portfolio", checkDbConnection, async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ initialInvestment: -1 });
    res.json({ portfolio });
  } catch (error) {
    console.error('❌ Error fetching portfolio:', error);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

app.get("/portfolio/:id", checkDbConnection, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio company not found" });
    }
    res.json({ portfolio });
  } catch (error) {
    console.error('❌ Error fetching portfolio company:', error);
    res.status(500).json({ error: "Failed to fetch portfolio company" });
  }
});

app.put("/portfolio/:id", checkDbConnection, uploadImage.single("logo"), async (req, res) => {
  try {
    const { 
      companyName, 
      description, 
      industry, 
      initialInvestment, 
      headquarters, 
      acquisitions, 
      status, 
      fund 
    } = req.body;

    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio company not found" });
    }

    // Update fields
    if (companyName) portfolio.companyName = companyName.trim();
    if (description) portfolio.description = description.trim();
    if (industry) portfolio.industry = industry.trim();
    if (initialInvestment) portfolio.initialInvestment = new Date(initialInvestment);
    if (headquarters) portfolio.headquarters = headquarters.trim();
    if (acquisitions !== undefined) portfolio.acquisitions = parseInt(acquisitions);
    if (status) portfolio.status = status.trim();
    if (fund) portfolio.fund = fund.trim();

    // Update logo if new one is uploaded
    if (req.file) {
      if (portfolio.logoPublicId) {
        await safeCloudinaryDestroy(portfolio.logoPublicId);
      }
      portfolio.logoUrl = req.file.path;
      portfolio.logoPublicId = req.file.filename;
    }

    await portfolio.save();
    console.log(`✅ Portfolio company updated: ${req.params.id}`);

    res.json({ message: "Portfolio company updated successfully", portfolio });
  } catch (error) {
    console.error('❌ Error updating portfolio company:', error);
    res.status(500).json({ error: "Failed to update portfolio company" });
  }
});

app.delete("/portfolio/:id", checkDbConnection, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio company not found" });
    }

    // Only delete from Cloudinary if logo exists
    if (portfolio.logoPublicId) {
      await safeCloudinaryDestroy(portfolio.logoPublicId);
    }

    await Portfolio.findByIdAndDelete(req.params.id);
    console.log(`✅ Portfolio company deleted: ${req.params.id}`);
    res.json({ message: "Portfolio company deleted successfully" });
  } catch (error) {
    console.error('❌ Error deleting portfolio company:', error);
    res.status(500).json({ error: "Failed to delete portfolio company" });
  }
});

// --- Global Error Handling ---
app.use((error, req, res, next) => {
  console.error('💥 Error:', error);

  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: error.message || 'Something went wrong!' });
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- SERVER START & DB CONNECTION ---
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Greenhall Capital Server Running!`);
  console.log(`🌐 Server listening on port ${PORT}`);
  console.log(`\n📋 Endpoints:`);
  console.log(' Team Members: POST/GET/PUT/DELETE /team');
  console.log(' News: POST/GET/PUT/DELETE /news (image optional)');
  console.log(' Portfolio: POST/GET/PUT/DELETE /portfolio');
  
  mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
  })
  .catch(err => {
    console.error('❌ Initial MongoDB connection failed:', err.message);
  });
});

// --- MONGOOSE CONNECTION EVENT HANDLERS ---
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected successfully!');
});

// --- GRACEFUL SHUTDOWN ---
const shutdown = async () => {
  console.log('\n🛑 Shutting down gracefully...');
  
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (err) {
    console.error('❌ Error closing MongoDB connection:', err);
  }
  
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown)