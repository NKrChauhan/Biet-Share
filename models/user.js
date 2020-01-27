const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        username: {
            type:       String,
            trim:       true,
            required:   true,
            max:        32,
            unique:     true,
            index:      true,
            lowercase:  true
        },
        name: {
            type:       String,
            trim:       true,
            required:   true,
            max:        32
        },
        branch: {
            type:       String,
            trim:       true,
            required:   true,
            max:        64
        },
        email: {
            type:       String,
            trim:       true,
            required:   true,
            unique:     true,
            lowercase:  true
        },
        room: {
            type:       String,
            required:   true,
            unique:     true
        },
        hashed_password: {
            type:       String,
            required:   true
        },
        salt:           String,
        rollno: {
            type:       Number,
        },
        year: {                         //suspect
            type:       Number,
            default:    date.now().getFullYear()
        },
        photo: {
            data:       Buffer,
            contentType:String
        },
        resetPasswordLink: {            //suspect
            data:       String,
            default:    ''
        }
    },
    { timestamp: true }
);

userSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makesalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods={
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makesalt:function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },

    authenticate:function(plaintext){
        return this.encryptPassword(plaintext)=== this.hashed_password;
    }  


}

module.exports = mongoose.model('User',userSchema)