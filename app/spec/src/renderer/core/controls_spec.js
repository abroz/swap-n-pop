const APP = require('../../../../app')('../../../../')
const chai   = require('chai')
const sinon  = require('sinon')
const mock   = require('mock-require')

mock('electron-store',function(){
  class  fake{constructor(){}}
  return fake
})
mock('electron', {})

const game = require(APP.path.spec('helpers','game_spec'))
const CoreControls = require(APP.path.core('controls'))(game)

chai.should()

describe('Controls', function() {
  describe('#serialize(pi)' ,function(){
    it('should get correct byte', function(){
      const controls = new CoreControls()
      const fun = sinon.stub()
      fun.withArgs('pl0_up'   ).returns(true)
      fun.withArgs('pl0_down' ).returns(false)
      fun.withArgs('pl0_left' ).returns(false)
      fun.withArgs('pl0_right').returns(false)
      fun.withArgs('pl0_a'    ).returns(false)
      fun.withArgs('pl0_b'    ).returns(false)
      fun.withArgs('pl0_r'    ).returns(false)
      fun.withArgs('pl0_l'    ).returns(false)
      fun.withArgs('pl0_start').returns(false)
      controls.check_down = fun
      controls.serialize(0).should.eql(0x01)
    })
    it('should get correct byte', function(){
      const controls = new CoreControls()
      const fun = sinon.stub()
      fun.withArgs('pl0_up'   ).returns(true)
      fun.withArgs('pl0_down' ).returns(false)
      fun.withArgs('pl0_left' ).returns(false)
      fun.withArgs('pl0_right').returns(false)
      fun.withArgs('pl0_a'    ).returns(false)
      fun.withArgs('pl0_b'    ).returns(true)
      fun.withArgs('pl0_r'    ).returns(false)
      fun.withArgs('pl0_l'    ).returns(false)
      fun.withArgs('pl0_start').returns(false)
      controls.check_down = fun
      controls.serialize(0).should.eql(0x21)
    })
  })
}) //klass
