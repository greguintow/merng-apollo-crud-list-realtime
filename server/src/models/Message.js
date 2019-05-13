import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
	content: {
		type: String,
		required: true
	}
})

const Message = mongoose.model('messages', messageSchema)
export default Message
