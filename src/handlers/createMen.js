"use strict";
const AWS = require("aws-sdk");

module.exports.createMen = async (event) => {
  const body = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_MENS_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};
