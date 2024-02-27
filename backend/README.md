TODO:
- why auth with cognito (user pool?) and not lambda?
- Document reason for AWS API Gateway
- should have used better name than concepts. something to do with ontology
- username: admin   |   passsword: @Admin(ontology)1
- username: employee   |   password: @Employee()1
- create user: aws cognito-idp admin-set-user-password --user-pool-id us-east-1_IwzleIjx0 --username admin --password "@Admin(ontology)1" --permanent