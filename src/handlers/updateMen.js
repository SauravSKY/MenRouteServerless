"use strict";
const AWS = require("aws-sdk");

module.exports.updateMen = async (event) => {
  const reqbody = JSON.parse(event.body);
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.DYNAMODB_MENS_TABLE,
    Key: {
      primary_key: event.pathParameters?.id,
    },
    UpdateExpression:
      "SET email= :email, country = :country, ranking= :ranking",
    ExpressionAttributeValues: {
      ":email": reqbody.email,
      ":country": reqbody.country,
      ":ranking": reqbody.ranking,
    },
    ReturnValues: "ALL_NEW",
  };
  let updatedMen;
  const result = await dynamodb.update(params).promise();
  updatedMen = result.Attributes;
  return {
    statusCode: 200,
    body: JSON.stringify(updatedMen),
  };
};
