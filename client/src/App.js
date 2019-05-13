import React from 'react'
import { Query } from 'react-apollo'
import { GET_MESSAGES } from './constants/queries'
import Messages from './components/Messages'
import TextInput from './components/TextInput'

const App = () => (
	<Query query={GET_MESSAGES}>
		{({ data, loading, subscribeToMore }) => {
			if (!data) return null

			if (loading) return <span>Loading...</span>

			return (
				<>
					<TextInput />
					<Messages
						messages={data.messages}
						subscribeToMore={subscribeToMore}
					/>
				</>
			)
		}}
	</Query>
)

export default App
