require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const UserModel = require("./models/Users");
const XrayModel = require("./models/Xray");
const HallMark = require("./models/Hallmark");
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save images to the "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Use a unique filename
    }
});

const upload = multer({ storage });

mongoose.connect("mongodb://127.0.0.1:27017/goldhallmark")
app.get("/", (req, res) => {
    res.json("Welcome to Gold Hallmark API");
})

app.get("/users", (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

// Create user with image upload
app.post("/createUser", upload.single('image'), (req, res) => {
    const { customerID, name, contact, company, address } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = new UserModel({
        customerID,
        name,
        contact,
        company,
        address,
        image: imagePath
    });

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "Error creating user", details: err }));
});

// Endpoint to update user details
app.put("/updateUser/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// DELETE endpoint to delete a user by ID
app.delete("/deleteUser/:id", (req, res) => {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error", error: err });
        });
});
// Route to create a new X-ray record
app.post("/createXray", upload.single("image"), async (req, res) => {
    try {
      const { customerID, company, item, quantity, weight, rate, amount, xray, customerFrom } = req.body;
  
      // Extract the image path
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
      // Create a new record
      const newXray = new XrayModel({
        customerID,
        company,
        item,
        quantity: parseFloat(quantity),
        weight: parseFloat(weight),
        rate: parseFloat(rate),
        amount: parseFloat(amount),
        xray,
        customerFrom: new Date(customerFrom),
        image: imagePath,
      });
  
      const savedXray = await newXray.save();
      res.status(201).json(savedXray);
    } catch (error) {
      console.error("Error saving X-ray record:", error);
      res.status(500).json({ error: "Failed to save X-ray record" });
    }
  });
  
app.get("/xray", (req, res) => {
    XrayModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
// Route to create a new hallmark record
app.post("/createHallmark", upload.single('image'), (req, res) => {
    const { customerID, company, item, quantity, weight, rate, amount, xray, customerFrom } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newHallmark = new HallMark({
        customerID,
        company,
        item,
        quantity,
        weight,
        rate,
        amount,
        xray,
        customerFrom,
        image: imagePath
    });

    newHallmark.save()
        .then((hallmark) => res.json(hallmark))
        .catch((err) => res.status(500).json({ error: "Error creating hallmark", details: err }));
});

app.get("/hallmark", (req, res) => {
    HallMark.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
const port = 8003;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})