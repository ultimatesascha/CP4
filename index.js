const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

var db = firebase.firestore();
var itemsRef = db.collection('items');

app.get('/api/items', async (req, res) => {
    try{
        let querySnapshot = await itemsRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }
    catch(err) {
        res.sendStatus(500);
    }
});

app.post('/api/save', async (req, res) => {
    try {
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        let item = {
            id: req.body.title,
            title: req.body.title,
            path: req.body.path,
            caption: req.body.caption,
        };
        console.log(item);
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }     
});


exports.app = functions.https.onRequest(app);