import { Injectable, Inject } from '@nestjs/common';
import neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jService {
	constructor(@Inject("Neo4j") private readonly neo4j) {}
	async findAll(): Promise<any> {
		const filter = "Containers encapsulate"
		const session = this.neo4j.session()
		try {
		const result = await session.run(
		  `CALL db.index.fulltext.queryNodes('gl_fulltext_node_index', $filter) YIELD node, score 
			WITH node, score 
			MATCH (parent)-[:parent]->(node)-[:parent]->(children)
			WITH properties(node) as node, collect(properties(parent)) as parents, collect(properties(children)) as children, score 
			RETURN {node: node, parents: parents, children: children} as json ORDER BY score DESC LIMIT 1`,
		  {
		    filter: filter 
		  }
		)
		const records = result.records
		const answer = []
		for (let i = 0; i < records.length; i++) {
		  const record = records[i]._fields[0]
		  answer.push(record)
		}
		return answer
		} finally {
			await session.close()
		}
	}
}