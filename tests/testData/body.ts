export const addIncorrectBody = [
  // {
  //   bodyData: {
  //     "height": undefined,
  //     "currentWeight": 133,
  //     "desiredWeight": 129,
  //     "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
  //     "blood": 3,
  //     "sex": "male",
  //     "levelActivity": 1
  //   },
  //   expectedMessage: 'The height field must not be empty.'
  // },
  {
    bodyData: {
      "height": "test",
      "currentWeight": 133,
      "desiredWeight": 129,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The height must be a number.'
  },
  {
    bodyData: {
      "height": 149,
      "currentWeight": 133,
      "desiredWeight": 129,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The height must be at least 150.'
  },
  {
    bodyData: {
      "currentWeight": 133,
      "desiredWeight": 129,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The height field is required.'
  },
];


export const bodyData =
{
  body: {
    "height": 154,
    "currentWeight": 133,
    "desiredWeight": 129,
    "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
    "blood": 3,
    "sex": "male",
    "levelActivity": 1
  }
  ,
  expectedMessage: "Email or password invalid"
}   