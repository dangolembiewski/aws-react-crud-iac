import { Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, ITable, Table} from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { getSuffixFromStack } from '../Utils'

export class DataStack extends Stack {

  public readonly conceptsTable: ITable

  constructor(scope: Construct, id: string, props?:StackProps){
    super(scope,id,props)

    const suffix = getSuffixFromStack(this);

    this.conceptsTable = new Table(this, 'ConceptsTable', {
      partitionKey : {
          name: 'id',
          type: AttributeType.STRING
      },
      tableName: `ConceptsTable-${suffix}`
    })
  }
}