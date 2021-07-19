import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {UserServiceBindings} from '../keys';
import {UserCredentials, UserCredentialsRelations} from '../models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
  > {
  constructor(
    @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
      dataSource: juggler.DataSource,
  ) {
    super(UserCredentials, dataSource);
  }
}
