import { BaseService, CoolCommException } from '@cool-midway/core';
import { Inject, InjectClient, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import * as _ from 'lodash';
import * as md5 from 'md5';
import { SoccerPlayerEntity } from '../entity/player';

@Provide()
export class SoccerPlayerService extends BaseService {
  @InjectEntityModel(SoccerPlayerEntity)
  soccerPlayerEntity: Repository<SoccerPlayerEntity>;

  @InjectClient(CachingFactory, 'default')
  midwayCache: MidwayCache;

  @Inject()
  ctx;

  /**
   * 新增
   * @param  param
   */

  async add(param) {
    const exist = await this.soccerPlayerEntity.findOneBy({
      name: param.name,
    });

    if (!_.isEmpty(exist)) {
      throw new CoolCommException('球员已存在');
    }

    await this.soccerPlayerEntity.save(param);

    return param.id;
  }

  async delete(ids) {
    let idArr;
    if (ids instanceof Array) {
      idArr = ids;
    } else {
      idArr = ids.split(',');
    }

    for (const id of idArr) {
      await this.soccerPlayerEntity.delete({ id });
    }
  }

  async update(param) {
    await this.soccerPlayerEntity.save(param);
  }

  async info(id) {
    const info = await this.soccerPlayerEntity.findOneBy({ id });
    return info;
  }

  async list() {
    return this.soccerPlayerEntity.createQueryBuilder().getMany();
  }

  async page(query) {
    const { keyWord } = query;
    const sql = `
        SELECT
            *
        FROM
             soccer_player a
        WHERE 1 = 1
            ${this.setSql(keyWord, 'and (a.name LIKE ?)', [`%${keyWord}%`])}
        `;

    return await this.sqlRenderPage(sql, query);
  }
}
