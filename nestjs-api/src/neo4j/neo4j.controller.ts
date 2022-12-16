import { Controller, Get, Param, Query } from '@nestjs/common';
import {Neo4jService} from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
	constructor (private readonly service: Neo4jService){}
	@Get()
	async findAll(@Query('filter') query: {filter: string}) {
		return this.service.findAll(query.toString());
	}
}
