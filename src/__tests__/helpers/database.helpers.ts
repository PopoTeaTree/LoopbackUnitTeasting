import { OrderRepository } from '../../repositories';
//import { testdb } from '../fixtures/datasources/testdb.datasource';
import { Db2DataSource } from '../../datasources';

export async function givenEmptyDatabase() {
  //await new BillRepository(Db2DataSource).deleteAll();
  await new OrderRepository(Db2DataSource).deleteAll();
}
