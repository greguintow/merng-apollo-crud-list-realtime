import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
    messages: [Message!]!
  }

	extend type Mutation {
		addMessage(content: String!): Message
		updateMessage(id: ID!, content: String!): Message
		removeMessage(id: ID!): Message
	}
	
  extend type Subscription {
    messageCreated: Message!
		messageUpdated: Message!
		messageRemoved: ID!
  }

  type Message {
    id: ID!
    content: String!
  }
`
