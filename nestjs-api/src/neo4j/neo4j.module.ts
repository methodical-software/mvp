import { Module } from '@nestjs/common';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';
import neo4j from 'neo4j-driver';

export const neo4jProvider = {
	provide: "Neo4j",
	useFactory: () => neo4j.driver("neo4j+s://a054c1cb.databases.neo4j.io:7687", neo4j.auth.basic("neo4j","RCerPW77WPGla7Echxy4Z8W0jUc0XomPqAqxhpSj7QI"),
  { disableLosslessIntegers: true })
};

@Module({
	exports: ['Neo4j'],
	imports: [],
	controllers: [Neo4jController],
	providers: [neo4jProvider, Neo4jService]
})


export class Neo4jModule {}
