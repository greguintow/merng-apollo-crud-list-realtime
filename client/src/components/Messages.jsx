import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import {
	MESSAGE_CREATED, REMOVE_MESSAGE, MESSAGE_REMOVED, MESSAGE_UPDATED, UPDATE_MESSAGE
} from '../constants/queries'


const Messages = ({ messages, subscribeToMore }) => {
	const [toUpdate, setToUpdate] = useState('')
	const [prevContent, setPrevContent] = useState('')
	const inputEl = useRef(null)
	useEffect(() => {
		subscribeToMore({
			document: MESSAGE_CREATED,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev
				return {
					messages: [
						...prev.messages,
						subscriptionData.data.messageCreated,
					]
				}
			}
		})
		subscribeToMore({
			document: MESSAGE_UPDATED,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev
				const mensagens = prev.messages
				const { messageUpdated } = subscriptionData.data
				const i = mensagens.findIndex(({ id }) => id === messageUpdated.id)
				if (mensagens[i].content !== messageUpdated.content) {
					mensagens[i] = {
						...mensagens[i],
						content: messageUpdated.content
					}
					return {
						messages: [
							...mensagens,
						]
					}
				}
			}
		})
		subscribeToMore({
			document: MESSAGE_REMOVED,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev
				return {
					messages: prev.messages.filter(({ id }) => id !== subscriptionData.data.messageRemoved)
				}
			}
		})
		// eslint-disable-next-line
	}, [])
	return (
		<table>
			<tbody>
				{messages.map(({ id, content }) => (
					<tr key={id}>
						<Mutation
							mutation={UPDATE_MESSAGE}
						>
							{updateMessage => (
								<td
									contentEditable
									suppressContentEditableWarning
									onFocus={() => {
										setToUpdate(id)
										setPrevContent(content)
									}}
									ref={id === toUpdate && inputEl}
									onBlur={async () => {
										if (prevContent !== inputEl.current.textContent) {
											await updateMessage({ variables: { id, content: inputEl.current.textContent } })
										}
										setToUpdate('')
									}}
								>
									{content}
								</td>
							)}
						</Mutation>
						<td>
							<Mutation
								mutation={REMOVE_MESSAGE}
								variables={{ id }}
							>
								{removeMessage => (
									// eslint-disable-next-line jsx-a11y/click-events-have-key-events
									<b onClick={removeMessage} tabIndex="-1" role="button" style={{ cursor: 'pointer' }}>&times;</b>
								)}
							</Mutation>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

Messages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	subscribeToMore: PropTypes.func.isRequired
}
export default Messages
