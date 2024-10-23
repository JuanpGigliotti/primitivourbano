import mongoose from 'mongoose';
import mongoosePaging from 'mongoose-paginate-v2';

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
