
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
const axios = require("axios");

const authOptions = {
 
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
      
      },
      async authorize(credentials, req) {

          


         
        
        try {
         
          const user = await axios.post("http://localhost:4001/login",{
            email:credentials.email,
            password:credentials.password,
          });
          console.log("userr:", user.data);
          
         
          if (user?.data?.user) {
           
           return user
          }else{
            return null
          }
        } catch (error) {console.log("getting error !");
      }
      },
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  // secret: process.env.NEXTAUTH_SECRET,
 
  pages:{
     signIn:"/"
  }

};

const handler = NextAuth(authOptions)
console.log("handlers:",handler,"----end");
module.exports = { GET: handler, POST: handler };
