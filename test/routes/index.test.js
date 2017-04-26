import bodyParser from 'body-parser'
import chai, { expect } from 'chai'
import chaiAP from 'chai-as-promised'
import chaiHTTP from 'chai-http'
import express from 'express'

import route from '../../routes'

chai.use(chaiAP)
chai.use(chaiHTTP)

describe('routes/index', () => {
  let app

  beforeEach(() => {
    app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(route)
  })

  describe('GET /', () => {
    let req

    beforeEach(() => {
      req = chai.request(app).get('/')
    })

    it('should handle request', () => {
      return expect(req).to.be.fulfilled
      .then((res) => {
        expect(res).to.have.status(200)
      })
    })
  })
})
