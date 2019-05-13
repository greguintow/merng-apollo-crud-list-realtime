import { Message } from '../models'
import { MESSAGE_CREATED, MESSAGE_UPDATED, MESSAGE_REMOVED } from '../constants'

export default {
	Query: {
		messages: () => Message.find()
	},
	Mutation: {
		addMessage: async (_root, { content }, { pubsub }) => {
			const message = await Message.create({ content })
			await pubsub.publish(MESSAGE_CREATED, {
				messageCreated: { id: message.id, content },
			})
			return message
		},
		updateMessage: async (_root, { id, content }, { pubsub }) => {
			const message = await Message.findByIdAndUpdate(id, { content })
			if (message) {
				await pubsub.publish(MESSAGE_UPDATED, {
					messageUpdated: {
						id,
						content
					}
				})
				return {
					id,
					content
				}
			}
			throw new Error('Não foi possível achar esse ID')
		},
		removeMessage: async (_root, { id }, { pubsub }) => {
			const message = await Message.findByIdAndDelete(id)
			if (message) {
				await pubsub.publish(MESSAGE_REMOVED, {
					messageRemoved: id
				})
				return message
			}
			throw new Error('Não foi possível achar esse ID')
		}
	},
	Subscription: {
		messageCreated: {
			subscribe: (_root, _args, { pubsub }) => pubsub.asyncIterator(MESSAGE_CREATED)
		},
		messageUpdated: {
			subscribe: (_root, _args, { pubsub }) => pubsub.asyncIterator(MESSAGE_UPDATED)
		},
		messageRemoved: {
			subscribe: (_root, _args, { pubsub }) => pubsub.asyncIterator(MESSAGE_REMOVED)
		}
	}
}
