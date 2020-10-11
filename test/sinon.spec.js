import {
  assert,
  expect
} from 'chai';

// https://www.npmjs.com/package/sinon
// https://sinonjs.org
// https://sinonjs.org/releases/v9.2.0/

import sinon from 'sinon';
import sinonTest from 'sinon-test';
const test = sinonTest(sinon);

// https://www.npmjs.com/package/should
import * as should from 'should';

// https://www.npmjs.com/package/jquery
// import $ from "jquery";
// import {$,jQuery} from 'jquery';

// https://www.npmjs.com/package/jquery#node
// For jQuery to work in Node, a window with a document is required. Since no such window exists natively in Node, one can be mocked by tools such as jsdom. This can be useful for testing purposes.
const {
  JSDOM
} = require("jsdom");
const {
  window
} = new JSDOM("");
const $ = require("jquery")(window);

var store = require('store')

// https://www.zcfy.cc/article/sinon-tutorial-javascript-testing-with-mocks-spies-stubs-422.html
// https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
describe('spy', function () {
  it('spy.firstCall.args', function () {
    var spy = sinon.spy();
    // 我们可以像调用函数一样调用一个spy
    spy('Hello', 'World');
    // 现在我们可以获取关于这次调用的信息
    console.log(spy.firstCall.args); //output: ['Hello', 'World'] 
  });

  it('spy.callCount', function () {
    var user = {
      setName: function (name) {
        this.name = name;
      }
    }
    // 为setName方法创建一个spy
    var setNameSpy = sinon.spy(user, 'setName');
    // 现在开始，每次调用这个方法时，相关信息都会被记录下来
    user.setName('Darth Vader');
    // 通过spy对象可以查看这些记录的信息
    console.log(setNameSpy.callCount); //output: 1
    // 重要的最后一步，移除spy
    setNameSpy.restore();
  });
});

function myFunction(condition, callback) {
  if (condition) {
    callback();
  }
}

describe('myFunction', function () {
  it('should.call.the.callback.function', function () {
    //it('should call the callback function', function () {
    var callback = sinon.spy();

    myFunction(true, callback);

    // assert(callback.calledOnce); 

    // 这种断言方式的问题在于测试失败时的错误信息不够明确。你只会得到一条类似“false不是true”这样的信息。你可能已经想到了，这样的信息对于确定测试为何会失败并没有什么帮助，你还是不得不查看测试代码来找到哪里出错了。这可不好玩。
    // 为了解决这个问题，我们可以在断言中加入一条自定义的错误信息。
    assert(callback.calledOnce, 'Callback was not called once');

    // sinon.assert.calledOnce(callback);
  });
});

function saveUser(user, callback) {
  $.post('/users', {
    // jQuery.post('/users', {
    first: user.firstname,
    last: user.lastname
  }, callback);
}

describe('saveUser', function () {
  it('append', function () {
    // https://stackoverflow.com/questions/17784786/how-to-spy-on-jquerys-append-function-sinon
    // Sinon.spy(object, "method") expects an object for first parameter, but $ is a function. You should spy on $.prototype 
    let spy = sinon.spy($.prototype, "append");
    let $div = $('<div></div>');

    $('body').append($div).append($div).append($div).append($div);

    console.log(spy.withArgs($div).callCount);
    expect(spy.withArgs($div).callCount).to.equal(4);
    spy.restore();
  });

  it('should.call.callback.after.saving', function () {
    //We'll stub $.post so a request is not sent
    var post = sinon.stub($, 'post');
    post.yields();

    //We can use a spy as the callback so it's easy to verify
    var callback = sinon.spy();

    saveUser({
      firstname: 'Han',
      lastname: 'Solo'
    }, callback);

    post.restore();
    sinon.assert.calledOnce(callback);
  });

  it('should send correct parameters to the expected URL', function () {

    //We'll stub $.post same as before
    var post = sinon.stub($, 'post');

    //We'll set up some variables to contain the expected results
    var expectedUrl = '/users';
    var expectedParams = {
      first: 'Expected first name',
      last: 'Expected last name'
    };

    //We can also set up the user we'll save based on the expected data
    var user = {
      firstname: expectedParams.first,
      lastname: expectedParams.last
    }

    saveUser(user, function () {});
    post.restore();

    sinon.assert.calledWith(post, expectedUrl, expectedParams);
  });

});

// https://mherman.org/blog/stubbing-http-requests-with-sinon/
function Person(givenName, familyName) {
  this.givenName = givenName;
  this.familyName = familyName;
}

Person.prototype.getFullName = function () {
  return `${this.givenName} ${this.familyName}`;
};

describe('Sample Sinon Stub Take 2', () => {
  it('should pass', (done) => {
    const name = new Person('Michael', 'Herman');
    name.getFullName().should.eql('Michael Herman');
    sinon.stub(Person.prototype, 'getFullName').returns('John Doe');
    name.getFullName().should.eql('John Doe');
    done();
  });
});


// https://sinonjs.org/
// Testing Ajax
function getTodos(listId, callback) {
  // jQuery.ajax({
  $.ajax({
    url: '/todo/' + listId + '/items',
    success: function (data) {
      // Node-style CPS: callback(err, data)
      callback(null, data);
    }
  });
}

describe('jQuery.ajax', () => {
  after(function () {
    sinon.restore();
  });

  it('makes a GET request for todo items', function () {
    // sinon.replace(jQuery, 'ajax', sinon.fake());
    sinon.replace($, 'ajax', sinon.fake());

    getTodos(42, sinon.fake());

    // assert(jQuery.ajax.calledWithMatch({ url: '/todo/42/items' }));
    assert($.ajax.calledWithMatch({
      url: '/todo/42/items'
    }));
  });
});

function incrementStoredData(value, amount) {
  var total = store.get(value) || 0;
  var newtotal = total + amount;
  store.set(value, newtotal);
}

describe('incrementStoredData', function () {
  it('should increment stored value by one', function () {
    var storeMock = sinon.mock(store);
    storeMock.expects('get').withArgs('data').returns(0);
    storeMock.expects('set').once().withArgs('data', 1);

    incrementStoredData('data', 1);

    storeMock.restore();
    storeMock.verify();
  });
});

var myOtherFunc = {
  callback() {

  }
}

function myFunc(condition) {
  if (condition) {
    myOtherFunc.callback();
  }
}

describe('sinon-test', function () {
  // https://www.npmjs.com/package/sinon-test
  // ??? not working
  // it('should do something 1', test(function () {
  //   var spy1 = this.spy(myFunc);
  //   var spy2 = this.spy(myOtherFunc);
  //   myFunc(1);
  //   myFunc(2);
  //   assert(spy1.calledWith(1)); // AssertionError: Unspecified AssertionError
  //   assert(spy1.calledWith(2)); // AssertionError: Unspecified AssertionError
  // })); //auto-cleanup	

  it('should do something 3', test(function () {
    // var spy1 = sinon.spy(myFunc);
    var spy2 = this.spy(myOtherFunc, 'callback');
    myFunc(1);
    // console.log("spy1.callCount first",spy1.callCount);
    console.log("spy2.callCount first", spy2.callCount);
    // assert(spy2.calledWith(1)); // AssertionError: Unspecified AssertionError
    // expect(spy1.callCount).to.equal(1);
    expect(spy2.callCount).to.equal(1);
    myFunc(2);
    // console.log("spy1.callCount second",spy1.callCount);
    console.log("spy2.callCount second", spy2.callCount);
    // assert(spy2.calledWith(2));  // AssertionError: Unspecified AssertionError
    // expect(spy1.callCount).to.equal(2);
    expect(spy2.callCount).to.equal(2);
  })); //auto-cleanup ('sinon-test')
});