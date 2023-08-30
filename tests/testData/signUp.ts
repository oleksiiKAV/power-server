export const singnUpIncorrectBody = [
    {      
      userData: {        
        
        "email": "new_user6@example.com",
        "password": "abcdef1"
      },
      expectedMessage: "The name field is required."
    },    
    {      
        userData: {        
          "name":"",  
          "email": "new_user6@example.com",
          "password": "abcdef1"
        },
        expectedMessage: "The name must not be empty"
      },
      {      
        userData: {        
          "name":123,  
          "email": "new_user6@example.com",
          "password": "abcdef1"
        },
        expectedMessage: "The name must be a string."
      },
    {
      userData: {
        "name":"test",
        "email": 123,
        "password": "abcdef1"
      },
      expectedMessage: 'The email must be a string.'
    },
    {
        userData: {
          "name":"test",
          
          "password": ""
        },
        expectedMessage: 'The email field is required.'
      },
      {
        userData: {
          "name":"test",
          "email": "",
          "password": "abcdef1"
        },
        expectedMessage: 'The email must not be empty'
      },  
      {
        userData: {
          "name":"test",
          "email": "test.com",
          "password": "abcdef1"
        },
        expectedMessage: 'The email must be in format test@gmail.com.'
      },
      {
        userData: {
          "name":"test",
          "email": "new_user6@example.com",
          "password": 123
        },
        expectedMessage: 'The password must be a string.'
      },
      {
          userData: {
            "name":"test",
            "email": "new_user6@example.com",
            
          },
          expectedMessage: 'The password field is required.'
        },
        {
          userData: {
            "name":"test",
            "email": "new_user6@example.com",
            "password": ""
          },
          expectedMessage: 'The password must not be empty.'
        },  
        {
          userData: {
            "name":"test",
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