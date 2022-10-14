const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`

		interface node {
				IRI: String!
				_created: String
				_updated: String
				description: String
				isDefinedBy: String
				label: String
				type: String
		    parent: node
		    children: node
		}

    type domain implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
	    _importId: String,
			description: String,
			isDefinedBy: String,
			issuer: String,
			label: String,
			level: String,
			seeAlso: String,
			terminal: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type framework_or_tool implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
			description: String,
			isDefinedBy: String,
			label: String,
			level: String,
			seeAlso: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type portfolio implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
			description: String,
			isDefinedBy: String,
			issuer: String,
			label: String,
			terminal: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type pattern implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
			description: String,
			isDefinedBy: String,
			label: String,
			seeAlso: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type synonym implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
			description: String,
			isDefinedBy: String,
			label: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type certification implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
			description: String,
			isDefinedBy: String,
			issuer: String,
			label: String,
			level: String,
			seeAlso: String,
			terminal: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type person implements node {
	    IRI: String!,
	    _created: String,
	    _updated: String,
			description: String,
			isDefinedBy: String,
			issuer: String,
			label: String,
			terminal: String,
			type: String,

			parent: node @relationship(type: "parent", direction: IN)
			children: node @relationship(type: "parent", direction: OUT)
    }

    type Query {
		  getDomains(filter: String): [domain]
		  domain(id: ID!): domain!
		  characterSearch(filter: String = "Orchestration"):[node] @cypher(statement:"""
	        CALL db.index.fulltext.queryNodes('gl_fulltext_node_index', $filter) YIELD node, score
	        RETURN node
	        ORDER BY score DESC
	        LIMIT 5
	    """)
		}
`;

	const resolvers = {
   node: {
    __resolveType(node, context, info){
	      return node.type.split(' ').join('_');
	    },
	  }
	}

const driver = neo4j.driver(
    "neo4j+s://a054c1cb.databases.neo4j.io:7687",
    neo4j.auth.basic("neo4j", "RCerPW77WPGla7Echxy4Z8W0jUc0XomPqAqxhpSj7QI"),
  	{ disableLosslessIntegers: true }
);

const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
      schema,
  });

  server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
  });
})