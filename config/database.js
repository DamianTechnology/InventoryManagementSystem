// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('MongoDB Connected');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         console.log('Mongo URI exists:', !!process.env.MONGO_URI);
//         console.log(
//             'Mongo URI:',
//             process.env.MONGO_URI?.replace(/\/\/.*?:.*?@/, '//USERNAME:PASSWORD@')
//         );

//         await mongoose.connect(process.env.MONGO_URI);

//         console.log('MongoDB Connected');
//     } catch (err) {
//         console.error('MongoDB Error:', err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

// const dns = require('dns');

// dns.setServers(['1.1.1.1', '1.0.0.1']);

// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         console.log('Mongo URI exists:', !!process.env.MONGO_URI);

//         await mongoose.connect(process.env.MONGO_URI);

//         console.log('MongoDB Connected');
//     } catch (err) {
//         console.error('MongoDB Error:', err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const dns = require('dns');

dns.setServers(['1.1.1.1', '1.0.0.1']);

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;