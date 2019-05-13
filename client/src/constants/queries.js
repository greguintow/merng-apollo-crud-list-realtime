import gql from 'graphql-tag'

export const GET_MESSAGES = gql`
  {
    messages {
      id
      content
    }
  }
`

export const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      id
      content
    }
  }
`

export const MESSAGE_UPDATED = gql`
	subscription {
		messageUpdated {
			id
			content
		}
	}
`

export const MESSAGE_REMOVED = gql`
	subscription {
		messageRemoved
	}
`

export const ADD_MESSAGE = gql`
	mutation addMessage($content: String!) {
		addMessage(content: $content) {
			id
			content
		}
	}
`

export const UPDATE_MESSAGE = gql`
	mutation updateMessage($id: ID!, $content: String!) {
		updateMessage(id: $id, content: $content) {
			id
			content
		}
	}
`

export const REMOVE_MESSAGE = gql`
	mutation removeMessage($id: ID!) {
		removeMessage(id: $id) {
			id
			content
		}
	}
`
