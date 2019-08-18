'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async kill(user) {
    const { redis } = this.app;
      redis.watch('kill_num', 'kill_users');
      const res = await redis
        .multi()
        .decr('kill_num')
        .rpush('kill_users', user)
        .exec((err, res) => {
          if (err) { 
            console.error(err);
            return false;
          }
          this.logger.info(res);
          return true;
        });
      return res;
  }
}

module.exports = HomeService;
