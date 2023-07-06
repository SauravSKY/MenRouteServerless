"use strict";
const AWS = require("aws-sdk");

module.exports.deleteMen = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  await dynamodb
    .delete({
      TableName: process.env.DYNAMODB_MENS_TABLE,
      Key: {
        primary_key: event.pathParameters?.id,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: "Deleted Item Successfully",
  };
};
