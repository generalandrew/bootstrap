import chai, { expect } from 'chai'
import chaiHTTP         from 'chai-http'
import logger           from 'winston'
import sinon            from 'sinon'

import server           from '../server'

chai.use(chaiHTTP)

describe('server', () => {
  beforeEach(() => {
    sinon.stub(logger, 'error')
  })

  afterEach(() => {
    logger.error.restore()
  })

  it('should exist', () => {
    expect(server).to.exist
  })

  it('should respond to ping request', done => {
    chai.request(server)
    .get('/__ping')
    .end((err, res) => {
      expect(err).to.not.exist
      expect(res).to.have.status(200)
      .and.to.be.text
      .and.to.not.have.header('x-powered-by')
      expect(res.text).to.equal('pong')

      done()
    })
  })
})
