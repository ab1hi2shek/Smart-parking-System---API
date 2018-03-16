const mongoose = require('mongoose');

const parkingSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lattitude: { type: String, required: true },
    longitude: { type: String, required: true },
    total_parking_space: { type: Number, required: true },
    free_parking_space: { type: Number, required: true },
    neighbours_Ids: [{type: String}]
});

module.exports = mongoose.model('Parking', parkingSchema);

// {
//         "neighbours_Ids": [
//             "B",
//             "K",
//             "C",
//             "D"
//         ],
//         "_id": "P",
//         "name": "Prantika",
//         "lattitude": "23.565945",
//         "longitude": "87.289656",
//         "total_parking_space": 200,
//         "free_parking_space": 60,
//         "__v": 0
//     }
