export const addIncorrectBody = [
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
  {
    bodyData: {
      "height": 176,
      "currentWeight": "test",
      "desiredWeight": 129,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The current weight must be a number.'
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 34,
      "desiredWeight": 129,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The current weight must be at least 35.'
  },
  {
    bodyData: {
      "height": 178,

      "desiredWeight": 129,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The current weight field is required.'
  },
  {
    bodyData: {
      "height": 176,
      "currentWeight": 123,
      "desiredWeight": "test",
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The desired weight must be a number.'
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 34,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The desired weight must be at least 35.'
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,

      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The desired weight field is required.'
  },
  {
    bodyData: {
      "height": 176,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "test",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The birthday must be a valid date.'
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 2010 00:00:00 GMT+0100 GMT+0100",
      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: '\"birthday\" failed custom validation because The person must be 18 years or older'
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,

      "blood": 3,
      "sex": "male",
      "levelActivity": 1
    },
    expectedMessage: 'The birthday field is required.'
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": "test",
      "sex": "male",
      "levelActivity": 1
    }
    ,
    expectedMessage: "Invalid blood type. Allowed values are 1, 2, 3, or 4."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 5,
      "sex": "male",
      "levelActivity": 1
    }
    ,
    expectedMessage: "Invalid blood type. Allowed values are 1, 2, 3, or 4."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 0,
      "sex": "male",
      "levelActivity": 1
    }
    ,
    expectedMessage: "Invalid blood type. Allowed values are 1, 2, 3, or 4."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
    
      "sex": "male",
      "levelActivity": 1
  }
  ,
  expectedMessage: "The blood type field is required"
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      "sex": 123,
      "levelActivity": 1
    }
    ,
    expectedMessage: "Invalid sex. Allowed values are male or female."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      "sex": "test",
      "levelActivity": 1
    }
    ,
    expectedMessage: "Invalid sex. Allowed values are male or female."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      
      "levelActivity": 1
    }
    ,
    expectedMessage: "The sex field is required"
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      "sex": "male",
      "levelActivity": "test"
    }
    ,
    expectedMessage: "Invalid level activity. Allowed values are 1, 2, 3, 4 or 5."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      "sex": "male",
      "levelActivity": 6
    }
    ,
    expectedMessage: "Invalid level activity. Allowed values are 1, 2, 3, 4 or 5."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      "sex": "male",
      "levelActivity": 0
    }
    ,
    expectedMessage: "Invalid level activity. Allowed values are 1, 2, 3, 4 or 5."
  },
  {
    bodyData: {
      "height": 178,
      "currentWeight": 123,
      "desiredWeight": 102,
      "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
      "blood": 2,
      "sex": "male",
    
    }
    ,
    expectedMessage: "The level activity field is required"
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