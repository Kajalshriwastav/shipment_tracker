import conn from "../../../../lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { json } from "stream/consumers";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "user", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const { email, password } = credentials;
        const client = await conn.connect();

        try {
          console.log("Email:", credentials.email);
          console.log("Password:", credentials.password);

          console.log("I'm here");
          if (client) {
            console.log("Connected to the database successfully");
          }

          const sql = "SELECT * FROM users WHERE email = $1";
          const params = [credentials.email];
          console.log("SQL Query:", sql);
          console.log("SQL Parameters:", params);
          const result = await client.query(sql, params);
          console.log(result.rows, "rowsss");
          const passwordMatches = await bcrypt.compare(
            credentials.password,
            result.rows[0].password
          );
          // const hashed = await bcrypt.compare(credentials.password,result.rows[0].password)
          console.log(passwordMatches, "hasssssssssssssssssssssssssssssss");
          // sessionStorage.setItem('data',JSON.stringify(result.rows))
          // return NextResponse.json(
          //   { message: "User Login Successfully.",data: result.rows },
          //   { status: 202 } // Use an object with a "status" property
          // );

          if (passwordMatches) {
            const userRole = result.rows[0].role;

            const user = result.rows[0];
            console.log("User Data:", user);

            if (userRole === "admin") {
              console.log("User is an admin");
              return Promise.resolve({ ...user, role: "admin" });
              console.log("Returning: ", { ...user, role: "admin" });
            } else if (userRole === "driver") {
              console.log("User is a driver");
              return Promise.resolve({ ...user, role: "driver" });
            }
          }

          return Promise.resolve(null);
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null);
        } //finally {
        // client.release();
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    session: async (session, user) => {
      // if (user && user.role) {
      console.log(user.role, "usre roooooooooooooooooooo");
      session.userRole = user.role;
      // }
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signIn",
  },
  session: {
    jwt: true,
    maxAge: 60000,
  },
});

export { handler as GET, handler as POST };
