let test = require('tape')
let arc = require('@architect/architect')
let data = require('@architect/data')

/**
 * tests in new async/await style
 */

// ensure the env is setup correctly
test('env', t=> {
  t.plan(2)
  t.ok(arc, 'got sandbox')
  t.ok(data, 'got data')
  console.log(data)
})
  
// start the sandbox; save a ref to end
let end
test('sandbox.start', async t=> {
  t.plan(1)
  end = await arc.sandbox.start()
  t.ok(true, 'started server')
})

// insert a row
test('data.put', async t=> {
  t.plan(1)
  let result = await data.tasks.put({
    accountID: 'fake-one',
    taskID: 'fake-task-id',
    text: 'one two buckle my shoe',
  })
  t.ok(result, 'got a result')
  console.log(result)
})

// get
test('data.get', async t=> {
  t.plan(1)
  let result = await data.tasks.get({
    accountID: 'fake-one',
    taskID: 'fake-task-id',
  })
  t.ok(result, 'got result')
  console.log(result)
})

// query (yes the syntax is weird!)
test('data.query', async t=> {
  t.plan(1)
  let result = await data.tasks.query({
    KeyConditionExpression: '#accountID = :accountID AND #taskID = :taskID',
    ExpressionAttributeNames: {
      '#accountID': 'accountID',
      '#taskID': 'taskID',
    },
    ExpressionAttributeValues: {
      ':accountID': 'fake-one',
      ':taskID': 'fake-task-id',
    }
  })
  t.ok(result, 'got result')
  console.log(result)
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

/*

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

*/

// end the sandbox
test('sandbox.end', async t=> {
  t.plan(1)
  end()
  t.ok(true, 'shutdown')
})

