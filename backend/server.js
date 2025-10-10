
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error", err));

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

app.post("/api/items", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name required" });
        }

        const item = new Item({ name });
        await item.save();
        res.json(item);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.get("/", async (req, res) => {
    res.send("running" + new Date());
});

app.get("/api/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
