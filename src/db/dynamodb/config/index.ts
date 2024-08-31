import dynamoose from "dynamoose"

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "baron",
        "secretAccessKey": "adams"
    },
    "region": "local"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.local("http://localhost:8000");