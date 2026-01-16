import NextAuth from "next-auth";

export const PROVIDER_ID = "identity-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    {
      id: PROVIDER_ID,
      name: "Identity Service",
      type: "oidc",
      issuer: process.env.IDENTITY_SERVICE_ISSUER,
      clientId: process.env.IDENTITY_SERVICE_CLIENT_ID,
      clientSecret: process.env.IDENTITY_SERVICE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile offline_access orders basket",
        },
      },
      checks: ["pkce", "state"],
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) token.accessToken = account.access_token;
      if (account?.refresh_token) token.refreshToken = account.refresh_token;
      if (account?.expires_at) token.accessTokenExpiresAt = account.expires_at;

      // nếu muốn dùng idToken ở session thì phải set:
      if (account?.id_token) token.idToken = account.id_token;

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      if (session.user) session.user.name = token.name as string;
      return session;
    },
  },
});
