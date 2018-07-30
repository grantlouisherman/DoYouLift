const { ApolloServer, gql } = require('apollo-server');
const Arms = require('./data/arms');

const typeDefs = gql`
  type Category {
    id: Int
    name: String
  }

  type Equipe {
    id: Int
    name: String
  }

  type Muscle {
    id: Int
    name: String
    is_front: Boolean
  }

  type Workouts {
    name: String
    category: Category
    description: String
    muscles:[Muscle]
    muscles_secondary:[Muscle]
    equipment:[Equipe]
  }

  type Query {
    arms: [Workouts]
  }
`;

const resolvers = {
  Query: {
    arms: () => Arms,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
