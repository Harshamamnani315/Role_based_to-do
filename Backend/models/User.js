const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'superadmin', 'user'],
    },
    date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.pre('save', function (next) {
    if (this.role === 'admin' || this.role === 'superadmin'|| this.role ==='user') {
      next();
    } else {
      const error = new Error('Invalid role');
      error.statusCode = 401;
      next(error);
    }
  });

module.exports = mongoose.model('user', UserSchema)