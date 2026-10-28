import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.DB_USER);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
};
const connectedClient = await connectToMongoDB();
const db = connectedClient.db("wanderlust");
const destinationCollection = db.collection("destination")
const bookingCollection = db.collection("booking")



const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add-destination', async(req, res) => {
  const data = req.body;
  const result = await destinationCollection.insertOne(data)
  console.log(result)
  res.send(result)
})


 

//all data get 
app.get('/destination', async(req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result)
})

//data details
app.get('/destination/:id', async(req, res) =>{
  const {id} = req.params;
  const result = await destinationCollection.findOne({_id:new ObjectId(id)});
  res.send(result)
})

//update 
app.put('/destination/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    
    const updatedDoc = {
      $set: {
        name: data.name,
        country: data.country,
        category: data.category,
        price: data.price,
        duration: data.duration,
        departureDate: data.departureDate,
        imageUrl: data.imageUrl,
        description: data.description,
      },
    };

    const result = await destinationCollection.updateOne(filter, updatedDoc, options);
    res.send(result);
  } catch (error) {
    console.error("Failed to update destination:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//delete
app.delete('/destination/:id', async(req,res) =>{
  const {id} = req.params
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
  res.send(result)
})


app.post('/booking', async (req, res) => {
  try {
    const data = req.body;
 
    const { _id, ...bookingData } = data; 

    const newBooking = {
      ...bookingData,
      destinationId: _id,  
      bookingDate: new Date()
    };

    const result = await bookingCollection.insertOne(newBooking);
    console.log("Booking saved successfully:", result);
    res.send({ success: true, result });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
});

app.get('/my-bookings/:email', async(req, res) => {
  const {email} = req.params
  const result = await bookingCollection.find({email:email}).toArray()
  res.send(result)
})

app.delete('/my-bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });
    console.log("Delete result:", result);
    res.send(result);
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})