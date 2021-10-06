⚠️ *This repository is archived. For an updated list of examples see [arc.codes/examples](https://arc.codes/examples).*

notes:

- architect/workflows sandbox requires NODE_ENV
  - NODE_ENV=testing uses the local in memory db on 5000
  - NODE_ENV=staging points to the staging dynamodb tables
  - NODE_ENV=production points to the production dynamodb tables
- architect/data uses ARC_LOCAL=1 to know to load .arc in the current working directly
