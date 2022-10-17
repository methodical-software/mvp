import { Controller, Get } from '@nestjs/common';
import {Neo4jService} from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
	constructor (private readonly retriveNodes: Neo4jService){}
	@Get()
	async findAll() {
		return this.retriveNodes.findAll();
	}
}
