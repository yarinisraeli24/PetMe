import mongoose from 'mongoose';
const { Schema } = mongoose;

const petScheme = new mongoose.Schema({
    petKind:{
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    age:{
        type: String,
        required: true
    },
    association: {
        type: String,
        required: true
    },
    color: {
        type: Array[String],
        required: true
    },
    breed: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    preference: {
        type: Array[String],
    },
    media: {
        type: Array[String],
        required: true
    }
})

const Pet = mongoose.model('Pet', petScheme);

const dogTommy = new Pet({petKind: "dog", name:"Tommy", age:"4 months", association: "SOS", color: "black", breed: "golden retriever", gender: "male", size: "small", media: ["https://www.akc.org/wp-content/uploads/2020/07/Golden-Retriever-puppy-standing-outdoors-500x486.jpg"]});
const catMizi = new Pet({petKind: "cat", name:"Mizi", age:"8 months", association: "SOS", color: "black-white", breed: "siam", gender: "female", size: "medium", media: ["https://p0.pikist.com/photos/534/741/cat-siamese-cat-fur-kitten-breed-cat-mieze-siamese-siam-cat-s-eyes-thumbnail.jpg"]});
const bunnyBugs = new Pet({petKind: "other", name:"Bugs", age:"1 year", association: "SOS", color: "white", gender: "male", size: "small", media: ["https://lh3.googleusercontent.com/fIH9F6BsGemtoAdBSETCCQxyJ4gTlWgxFWDNQWJYKm-P9gujWPJuTv0ZV-0FBmb0KeZYhaushZ4GsdxWrns7g88Hy40=w640-h400-e365-rj-sc0x00ffffff"]});
const dogSimba = new Pet({petKind: "dog", name:"Simba", age:"2 years", association: "SOS", color: "black-white-brown", breed: "mixed", gender: "male", size: "big", media: ["https://cdn.britannica.com/49/161649-050-3F458ECF/Bernese-mountain-dog-grass.jpg?q=60"]});
const dogBery = new Pet({petKind: "dog", name:"Bery", age:"4 years", association: "SOS", color: "black-brown", breed: "pincher", gender: "male", size: "small", media: ["https://thumbs.dreamstime.com/b/black-brown-miniature-pinscher-portrait-summer-time-smart-cute-pincher-funny-ears-round-eyes-visual-minyatur-very-148106111.jpg"]});

const pets = [dogTommy, catMizi, bunnyBugs, dogSimba, dogBery]