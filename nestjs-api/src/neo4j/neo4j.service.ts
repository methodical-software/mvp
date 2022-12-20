import { Injectable, Inject} from '@nestjs/common';
import neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jService {
	constructor(@Inject("Neo4j") private readonly neo4j) {}

	async findAll(filter: string, exclude: any): Promise<any> {
		const session = this.neo4j.session()
		const query = `CALL db.index.fulltext.queryNodes('gl_fulltext_node_index', $filter) YIELD node, score
		WHERE not any(label IN labels(node) WHERE label in $exclude) 
			WITH node, score ORDER BY score DESC LIMIT 10
			MATCH (node)-[:parent]->(children)
			WITH  node, collect(properties(children)) as children
			MATCH (parent)-[:parent]->(node)
			WITH  properties(node) as node, collect(properties(parent)) as parents, children
			RETURN {node: node, parents: parents, children: children} as json`
		try {
		const result = await session.run(query, { filter: filter, exclude: exclude })
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