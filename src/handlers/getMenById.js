"use strict";
const AWS = require("aws-sdk");

module.exports.getMenById = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let men;
  const result = await dynamodb
    .get({
      TableName: process.env.DYNAMODB_MENS_TABLE,
      Key: {
        primary_key: event.pathParameters?.id,
      },
    })
    .promise();
  men = result.Item;
  if (!men) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(men),
  };
};
