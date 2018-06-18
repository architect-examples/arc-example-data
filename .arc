@app
test-data

@tables
accounts
  accountID *String

tasks
  accountID *String
  taskID **String

@indexes
accounts
  email *String

accounts
  phone *String
