'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getStatus', controller.home.getStatus);
  router.get('/init', controller.home.init);
  router.get('/kill', controller.home.kill);
};
