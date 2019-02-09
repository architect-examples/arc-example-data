let test = require('tape')
let arc = require('@architect/architect')
let data = require('@architect/data')

/**
 * tests in Node errback style
 */

// ensure the env is setup correctly
test('env', t=> {
  t.plan(2)
  t.ok(arc, 'got sandbox')
  t.ok(data, 'got data')
  console.log(data)
})
  
test('data', t=> {
  t.plan(7)
  t.ok(typeof data.accounts === 'object', 'data.accounts')
  t.ok(data.accounts.delete, 'data.accounts.delete')
  t.ok(data.accounts.get, 'data.accounts.get')
  t.ok(data.accounts.put, 'data.accounts.put')
  t.ok(data.accounts.query, 'data.accounts.query')
  t.ok(data.accounts.scan, 'data.accounts.scan')
  t.ok(data.accounts.update, 'data.accounts.update')
})

// start the sandbox; save a ref to end
let end
test('sandbox.start', async t=> {
  t.plan(1)
  end = await arc.sandbox.start()
  t.ok(true, 'started server')
})

// access dynamodb directly
test('data._db', t=> {
  t.plan(1)
  data._db.listTables({}, function _listTables(err, result) {
    if (err) {
      t.fail(err, err) 
    }
    else {
      t.ok(result, 'got result')
      console.log(result)
    }
  })
})


// insert a row
test('data.put', t=> {
  t.plan(1)
  data.accounts.put({
    accountID: 'fake-one',
    email: 'b@brian.io',
    phone: '415-555-5555',
    name: 'brianleroux'
  },
  function _put(err, result) {
    if (err) {
      throw err
      t.fail(err, err)
    }
    else {
      t.ok(result, 'got result')
    }
    console.log(result)
  })
})

// get
test('data.get', t=> {
  t.plan(1)
  data.accounts.get({
    accountID: 'fake-one',
  },
  function _put(err, result) {
    if (err) {
      throw err
      t.fail(err, err)
    }
    else {
      t.ok(result, 'got result')
    }
    console.log(result)
  })
})

// query (yes the syntax is weird!)
test('data.query', t=> {
  t.plan(1)
  data.accounts.query({
    KeyConditionExpression: '#accountID = :accountID',
    ExpressionAttributeNames: {
      '#accountID': 'accountID'
    },
    ExpressionAttributeValues: {
      ':accountID': 'fake-one'
    }
  },
  function _put(err, result) {
    if (err) {
      throw err
      t.fail(err, err)
    }
    else {
      t.ok(result, 'got result')
    }
    console.log(result)
  })
})


// update syntax
test('data.update', t=> {
  t.plan(1)
  data.accounts.update({
    Key: {
      accountID: 'fake-one'
    },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':name': 'fakebrianleroux'
    }
  }, 
  function _update(err) {
    if (err) {
      throw err
      t.fail(err, err)
    }
    else {
      t.ok(true, 'got result')
    }
  })
})

// scan (not reccomended)
test('data.scan', t=> {
  t.plan(1)
  data.accounts.scan({}, function _scan(err, result) {
    if (err) {
      throw err
      t.fail(err, err)
    }
    else {
      t.ok(result, 'got result')
    }
    console.log(result)
  })
})

// delete
test('data.delete', t=> {
  t.plan(1)
  data.accounts.delete({
    accountID: 'fake-one'
  }, 
  function _update(err, result) {
    if (err) {
      throw err
      t.fail(err, err)
    }
    else {
      t.ok(result, 'got result')
    }
    console.log(result)
  })
})

// end the sandbox
test('sandbox.end', async t=> {
  t.plan(1)
  end()
  t.ok(true, 'shutdown')
})
