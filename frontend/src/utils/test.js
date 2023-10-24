axios({
    url : 'https://api.github.com/graphql',
    method : 'post',
    headers : {
      Authorization : 'bearer ' + res.data.access_token
    },
    data : {
      query : `
        query {
          viewer {
            login
            name
          }
        }
      `
    }
  }).then(res => console.log(res))