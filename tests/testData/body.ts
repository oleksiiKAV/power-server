export const singnInIncorrectBody = [
    {
      userData: {        
        "email": 123,
        "password": "abcdef1"
      },
      expectedMessage: 'The email must be a string.'
    },
    {
        userData: {
                    
          "password": "abcdef1"
        },
        expectedMessage: 'The email field is required.'
      },
      {
        userData: {
          "email": "",
          "password": "abcdef1"
        },
        expectedMessage: 'The email must not be empty'
      },  
      {
        userData: {
          "email": "test.com",
          "password": "abcdef1"
        },
        expectedMessage: 'The email must be in format test@gmail.com.'
      },
      {
        userData: {
          "email": "new_user6@example.com",
          "password": 123
        },
        expectedMessage: 'The password must be a string.'
      },
      {
          userData: {
            "email": "new_user6@example.com",
            
          },
          expectedMessage: 'The password field is required.'
        },
        {
          userData: {
            "email": "new_user6@example.com",
            "password": ""
          },
          expectedMessage: 'The password must not be empty.'
        },  
        {
          userData: {
            "email": "new_user6@example.com",
            "password": "ab"
          },
          expectedMessage: 'The password must consist of 6 English letters and 1 number.'
        },
        {
            userData: {
              "name":"test",
              "email": "new_user6@example.com",
              "password": "abcd12345"
            },
            expectedMessage: 'The password must consist of 6 English letters and 1 number.'
          },
  ];

  
  export const bodyData = 
    {      
      body: {
          "height":154,
       "currentWeight":133,
       "desiredWeight":129,
       "birthday": "Mon May 02 1979 00:00:00 GMT+0100 GMT+0100",
       "blood":3,
       "sex":"male",
       "levelActivity":1
       }
      ,
      expectedMessage: "Email or password invalid"
    }   