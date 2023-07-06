"use strict";
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

module.exports.createMen = async (event) => {
  const body = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_MENS_TABLE,
    Item: {
      primary_key: uuidv4(),
      name: body.name,
      email: body.email,
      ranking: body.ranking,
      country: body.country,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};
