import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { renderToString } from 'react-dom/server'
import { todoRouter } from './api/routes/todoRoute'
require('dotenv').config()

const server = express()
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const cssLinksFromAssets = (assets, entrypoint) => {
    return assets[entrypoint]
        ? assets[entrypoint].css
            ? assets[entrypoint].css
                  .map((asset) => `<link rel="stylesheet" href="${asset}">`)
                  .join('')
            : ''
        : ''
}

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
    return assets[entrypoint]
        ? assets[entrypoint].js
            ? assets[entrypoint].js
                  .map((asset) => `<script src="${asset}"${extra}></script>`)
                  .join('')
            : ''
        : ''
}

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('mongodb running')
        }
    }
)

const corsOptions = {
    origin: 'http://localhost:3000',
}

server.use(express.json())
server.use(cors(corsOptions))

server.use('/api/todos', todoRouter)

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const context = {}
        const markup = renderToString(
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>
        )

        if (context.url) {
            res.redirect(context.url)
        } else {
            res.status(200).send(
                `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta charset="utf-8" />
                        <meta name='description' content='Todo app using create-razzle-app'/>
                        <meta name='keywords' description='razzle, todo app, mongoose-razzle-app'/>
                        <title>Todo app with razzle</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        ${cssLinksFromAssets(assets, 'client')}
                    </head>
                    <body>
                        <div id="root">${markup}</div>
                        ${jsScriptTagsFromAssets(
                            assets,
                            'client',
                            ' defer crossorigin'
                        )}
                    </body>
                </html>`
            )
        }
    })

export default server
