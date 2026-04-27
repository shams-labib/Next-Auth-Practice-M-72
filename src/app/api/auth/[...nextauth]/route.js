import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { name: "bablu", password: "1234" },
  { name: "dablu", password: "5678" },
  { name: "hablu", password: "8910" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} option
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Jonny sins",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
        secretCode: {
          label: "Secret Code",
          type: "number",
          placeholder: "Add your fucking code",
        },
      },
      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;
        // My Own logic loading
        const user = userList.find((u) => u.name === username);
        if (!user) {
          return null;
        }

        const isPassword = user.password === password;
        if (isPassword) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
