import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { HOSTNAME, NEO4J_USER, NEO4J_PASSWORD } from '../config';
// import { Domain } from '../app.graphql';
import { Connection, relation, node } from 'cypher-query-builder';
import { NotFoundException } from '@nestjs/common';
const db = new Connection(`bolt://${HOSTNAME}`, {
username: NEO4J_USER,
password: NEO4J_PASSWORD,
});

@Resolver('domain')
export class NeogqlResolver {
  @Query()
  async getDomains(): Promise<any> {
    const domains = (await db
      .matchNode('domains', 'Domain')
      .return([
        {
          domains: [{ id: 'id' }],
        },
      ])
      .run()) as any;
    return domains;
  }
@Query('domain')
  async getDomainById(
    @Args('id')
    id: string,
  ): Promise<any> {
    const domain = (await db
      .matchNode('domain', 'Domain')
      .where({ 'domain.id': id })
      .return([
        {
          domain: [{ id: 'id' }],
        },
      ])
      .run<any>()) as any;
      if (domain.length === 0) {
            throw new NotFoundException(
              `Domain id '${id}' does not exist in database `,
            );
      }
  return domain[0];
  }

}
