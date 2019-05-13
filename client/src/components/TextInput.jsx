import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { ADD_MESSAGE } from '../constants/queries'

const TextInput = () => {
	const [content, setContent] = useState('')

	const enviar = addMensagem => {
		addMensagem({ variables: { content } })
		setContent('')
	}

	return (
		<Mutation mutation={ADD_MESSAGE}>
			{addMensagem => (
				<input
					type="text"
					value={content}
					onChange={e => setContent(e.target.value)}
					onKeyDown={e => e.keyCode === 13 && enviar(addMensagem)}
				/>
			)}
		</Mutation>
	)
}

export default TextInput
