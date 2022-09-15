
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require("dotenv").config();
// const clc = require('cli-color');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




app.use(cors());
app.use(express.json());





// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://autoproctor:qaovL8TaXarLJhXR@cluster0.ll7din6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        console.log("MongoDB is connected");

        const questionsCollection = client.db('questionsDB').collection('questions')

        app.get('/', async (req, res) => {

            res.send("server starting")
        })

        // get questions by filtering by question type 

        app.get('/get-all-questions', async (req, res) => {

            try {

                const questionType = req.query.questionType;

                // console.log('question type: ', questionType);


                const query = { questionType: questionType };

                let result;

                if (questionType === 'all') {

                    result = await questionsCollection.find().toArray();

                }
                else {
                    result = await questionsCollection.find(query).toArray();

                }


                // console.log('res: ', result);

                return res.send(result);


            } catch (error) {

                res.send(error)
            }


        })


        // Add new question in the database 
        app.post('/add-question', async (req, res) => {

            try {

                const data = req.body;

                // console.log("data: ", data);

                const result = await questionsCollection.insertOne(data);

                // console.log("result: ", result);

                return res.send(result);


            } catch (error) {

                res.send(error)
            }


        })
        // Add multiple question in the database 
        app.post('/add-questions', async (req, res) => {

            try {

                const data = req.body;

                // console.log("data: ", data);

                const result = await questionsCollection.insertMany(data);

                // console.log("result: ", result);

                return res.send(result);


            } catch (error) {

                res.send(error)
            }


        })
        // Delete question in the database 
        app.delete('/delete-question', async (req, res) => {

            try {

                const _id = req.query.deleteQuestionId;

                const query = { _id: ObjectId(_id) }

                const result = await questionsCollection.deleteOne(query);

                // console.log("delete result: ", result);

                return res.send(result);


            } catch (error) {

                res.send(error)
            }


        })






    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}


run().catch(console.dir);

























app.listen(port, () => {
    console.log("server is running ");
})



// user: autoproctor
// pass: qaovL8TaXarLJhXR
// dG81RRVEbOXnvU4L