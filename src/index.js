const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.hackrnews.com',
    description: 'Hackernews'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is a GraphQL server for Hackernews API`,
    feed: () => links,
    link: (root, args) => {
      return links.find(link => link.id === `link-${args.id}`);
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
