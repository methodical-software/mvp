import { Injectable, Inject} from '@nestjs/common';
import neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jService {
	constructor(@Inject("Neo4j") private readonly neo4j) {}

	async findAll(filter): Promise<any> {

		const session = this.neo4j.session()
		try {
		const result = await session.run(
		  `CALL db.index.fulltext.queryNodes('gl_fulltext_node_index', $filter) YIELD node, score 
			WITH node, score 
			MATCH (children)-[:parent]->(node)-[:parent]->(parent)
			WITH node.IRI as node_id, properties(node) as node, collect(distinct properties(parent)) as parents, collect( distinct parent.IRI) as parents_ids, collect(distinct properties(children)) as children, score 
			RETURN {node: node, node_id: node_id, parents: parents, parents_ids: parents_ids, children: children} as json ORDER BY score DESC LIMIT 5`,
		  {
		    filter: filter 
		  }
		)
		const records = result.records
		const answer = []
		// TODO: better create more elegant way to return format data needed 
		for (let i = 0; i < records.length; i++) {
			let nodes = []
			const record = records[i]._fields[0]
			// handle node (change IRI to id add parent_ids as parents)
			let node = record.node
			node.id = node.IRI
			node.parents = record.parents_ids
			delete node.IRI
			// push node to nodes
			nodes.push(node)

			// handle parents (change IRI to id)			
			let parents = record.parents.map((parent) => {
			    parent.id = parent.IRI
			    parent.parents = null
			    delete parent.IRI
			    return parent
			})
			// push parents to nodes
			nodes = [...nodes, ...parents]
			
			// handle children (change IRI to id add node_id as parents)
			let children = record.children.map((child) => {
			    child.id = child.IRI
			    child.parents = [node.id]
			    // child.templateName = "contactTemplate"
			    delete child.IRI
			    return child
			})

			
			// push children to nodes
			nodes = [...nodes, ...children]
			nodes = nodes.map((node)=>{
				node.templateName = "ItemTemplate"
				return node
			})
			answer.push(nodes)
		}
		// console.log(answer)
		return answer
		} finally {
			await session.close()
		}
	}
}