const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt')
const timestamp = require('mongoose-timestamp')


var UserSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            index: true,
            trim: true
        },
        Email: {
            type: String,
            required: true,
            index: true,
            trim: true
        },
        Password: {
            type: String,
            required: true,
            bcrypt: true
        },
        Ocupation: {
            type: String,
            required: true,
            trim: true
        },
        Permission: {
            type: String,
            required: true,
            trim: true
        },
        Team: {
            type: String,
            required: true,
            trim: true
        },
        recoveryCode: {
            type: String,
            trim: true,
            default: '',
        },
    }    
);

// UserSchema.pre('save', (next) => {
//     if(!this.isNew){
//         next();
//     }

//     Email({
//         type: 'Registration complete!',
//         Email: this.Email
//     }).then(() => {
//         next();
//     }).catch(err => {
//         loggers.console.error(err);
//         next();
//     });
// });

// UserSchema.pre('findOneAndUpdate', (next) => {
//     if(!this._update.recoveryCode){
//         return next();
//     }

//     Email({
//         type: 'password',
//         Email: this._condition.Email,
//         passcode: this._update.recoveryCode
//     }).the(() => {
//         next();
//     }).catch(err => {
//         loggers.error(err);
//         next();
//     });
// });


UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamp);

UserSchema.index({ Email: 1, Name: 1})

module.exports = mongoose.model('Users', UserSchema);