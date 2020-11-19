command line: npm start

//register:
post request at http://localhost:8000/api/user/register

in the body, write
{
    "name": "123456",
    "email" : "123@gmail.com",
    "password": "123456"
}

then a new user is created


//login
post request at http://localhost:8000/api/user/login

in the body, write
{
    "email" : "123@gmail.com",
    "password": "123456"
}
login would respond with a token 'auth-token'
then you are logged in 


//private access for one logged in user:

1. copy the auth-token of a logged-in user
2. then get request at http://localhost:8000/api/post
3. in the header, add the auth-token variable, with the value you just copied, then get request.
4. It would display something if the user is logged in
