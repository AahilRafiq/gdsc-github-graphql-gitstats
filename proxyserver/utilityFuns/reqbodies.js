import "dotenv/config";

function reqAccessTokenBody(code) {
  return {
    url: "https://github.com/login/oauth/access_token",
    method: "POST",
    headers: {
      accept: "application/json",
    },
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
    },
  };
}

function graphqlQueryBody(userToken , username) {
  return {
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: "bearer " + userToken,
    },
    data: {
      query: `
            query {
              user(login: "${username}") {
                name
                url
                avatarUrl
                bio
                followers {
                  totalCount
                }
                following{
                  totalCount
                }
                contributionsCollection{
                  totalCommitContributions
                }
                repositories(first: 50) {
                  nodes{
                    name
                    url
                  }
                }
                topRepositories(first: 50 orderBy: {field: CREATED_AT, direction: DESC} ) {
                  nodes{
                    name
                    url
                  }
                }
              }
            }
          `,
    },
  };
}

export{
    reqAccessTokenBody,
    graphqlQueryBody
}
