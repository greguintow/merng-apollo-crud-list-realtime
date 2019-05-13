import express from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { config } from 'dotenv'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

config()

const app = express()

const pubsub = new PubSub()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ pubsub })
})

app.get('/', (_req, res) => {
	res.redirect('/graphql')
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)
mongoose.connect(process.env.URI, { useNewUrlParser: true, useFindAndModify: false }).then(() => {
	httpServer.listen({ port: process.env.PORT }, () => {
		console.log('Apollo Server on http://localhost:8000/graphql')
	})
})
