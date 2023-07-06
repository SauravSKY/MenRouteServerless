"use strict";
const AWS = require("aws-sdk");

module.exports.getMens = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_MENS_TABLE,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map((men) => {
        return {
          name: men.primary_key,
          email: men.email,
        };
      }),
    }),
  };
};
