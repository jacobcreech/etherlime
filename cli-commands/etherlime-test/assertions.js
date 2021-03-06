var ethers = require("ethers");

module.exports = function (chai, utils) {
  var assert = chai.assert;
  chai.Assertion.addProperty('address', function () {
    this.assert(this._obj.length === 42, 'expected #{this} to be a 42 character address (0x...)', 'expected #{this} to not be a 42 character address (0x...)');
    
    var number = ethers.utils.bigNumberify(this._obj);
    this.assert(number.eq(0) === false, 'expected address #{this} to not be zero', 'you shouldn\'t ever see this.');
  });
  assert.isAddress = function (val, exp, msg) {
    return new chai.Assertion(val, msg).to.be.address;
  };

  assert.revert = async (promise, msg) => {
    try {
      let result = await promise;
      console.log(result);
    } catch (error) {
      const invalidJump = error.message.search('invalid JUMP') >= 0
      const invalidOpcode = error.message.search('invalid opcode') >= 0
      const outOfGas = error.message.search('out of gas') >= 0
      const revert = error.message.search('revert') >= 0
      assert(invalidJump || invalidOpcode || outOfGas || revert, msg ? `Expected throw, got ${error.message} instead. ${msg}` : `Expected throw, got ${error.message} instead`)
      return
    }
    assert.fail(msg ? msg : 'Expected throw not received')
  }
};
