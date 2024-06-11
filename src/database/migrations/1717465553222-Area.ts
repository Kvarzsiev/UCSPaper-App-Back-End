import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Area1717465553222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS ltree;');

    await queryRunner
      .createTable(
        new Table({
          name: 'area',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'gen_random_uuid()',
            },
            {
              name: 'cnpq_code',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'text',
              isUnique: true,
            },
            {
              name: 'hierarchy',
              type: 'ltree',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
        true,
      )
      .then(async () => {
        await queryRunner.query(
          `
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', '1.00.00.00-3', 'Ciências Exatas e da Terra', 'CIENCIAS_EXATAS_E_DA_TERRA');
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af1', '1.03.00.00-7', 'Ciência da Computação', 'CIENCIAS_EXATAS_E_DA_TERRA.CIENCIA_DA_COMPUTACAO');
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af2', '1.03.03.00-6', 'Metodologia e Técnicas da Computação', 'CIENCIAS_EXATAS_E_DA_TERRA.CIENCIA_DA_COMPUTACAO.METODOLOGIA_E_TECNICAS_DA_COMPUTACAO');
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af3', '1.03.03.02-2 ', 'Engenharia de Software', 'CIENCIAS_EXATAS_E_DA_TERRA.CIENCIA_DA_COMPUTACAO.METODOLOGIA_E_TECNICAS_DA_COMPUTACAO.ENGENHARIA_DE_SOFTWARE');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'1.01.00.00-8',
'Matemática',
'CIENCIAS_EXATAS_E_DA_TERRA.MATEMATICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'1.04.00.00-1',
'Astronomia',
'CIENCIAS_EXATAS_E_DA_TERRA.ASTRONOMIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'1.05.00.00-6',
'Física',
'CIENCIAS_EXATAS_E_DA_TERRA.FISICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'1.06.00.00-0',
'Química',
'CIENCIAS_EXATAS_E_DA_TERRA.QUIMICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'1.07.00.00-5',
'GeoCiências',
'CIENCIAS_EXATAS_E_DA_TERRA.GEOCIENCIAS');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'1.08.00.00-0',
'Oceanografia',
'CIENCIAS_EXATAS_E_DA_TERRA.OCEANOGRAFIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.00.00.00-6',
'Ciências Biológicas',
'CIENCIAS_BIOLOGICAS');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.01.00.00-0',
'Biologia Geral',
'CIENCIAS_BIOLOGICAS.BIOLOGIA_GERAL');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.02.00.00-5',
'Genética',
'CIENCIAS_BIOLOGICAS.GENETICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.03.00.00-0',
'Botânica',
'CIENCIAS_BIOLOGICAS.BOTANICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.05.00.00-9',
'Ecologia',
'CIENCIAS_BIOLOGICAS.ECOLOGIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.06.00.00-3',
'Morfologia',
'CIENCIAS_BIOLOGICAS.MORFOLOGIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.07.00.00-8',
'Fisiologia',
'CIENCIAS_BIOLOGICAS.FISIOLOGIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.08.00.00-2',
'Bioquímica',
'CIENCIAS_BIOLOGICAS.BIOQUIMICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.09.00.00-7',
'Biofísica',
'CIENCIAS_BIOLOGICAS.BIOFISICA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.10.00.00-0',
'Farmacologia',
'CIENCIAS_BIOLOGICAS.FARMACOLOGIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'2.11.00.00-4',
'Imunologia',
'CIENCIAS_BIOLOGICAS.IMUNOLOGIA');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'5.00.00.00-4',
'Ciências Agrárias',
'CIENCIAS_AGRARIAS');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'5.02.00.00-3',
'Recursos Florestais e Engenharia Florestal',
'CIENCIAS_AGRARIAS.RECURSOS_FLORESTAIS_E_ENGENHARIA_FLORESTAL');
 insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'5.03.00.00-8',
'Engenharia Agrícola',
'CIENCIAS_AGRARIAS.ENGENHARIA_AGRICOLA');
 insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'6.00.00.00-7',
'Ciências Sociais Aplicadas',
'CIENCIAS_SOCIAIS_APLICADAS');
 insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'6.01.00.00-1',
'Direito',
'CIENCIAS_SOCIAIS_APLICADAS.DIREITO');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'7.00.00.00-0',
'Ciências Humanas',
'CIENCIAS_HUMANAS');
insert
	into
	area (id,
	cnpq_code,
	name,
	hierarchy)
values (default,
'7.01.00.00-4',
'Filosofia',
'CIENCIAS_HUMANAS.FILOSOFIA');
`,
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('area', true, true, true);
  }
}
