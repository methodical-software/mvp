
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Domain {
    id: string;
}

export abstract class IQuery {
    abstract getDomains(): Domain[] | Promise<Domain[]>;

    abstract domain(id: string): Domain | Promise<Domain>;
}

type Nullable<T> = T | null;
