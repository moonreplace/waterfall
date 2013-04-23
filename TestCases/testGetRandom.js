/**
 * Created with JetBrains WebStorm.
 * User: Cris.dai
 * Date: 13-4-19
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 */
var dbUtil = require('../Util/generateRandom');

for(var i=0;i<10; i++){
 console.log(dbUtil.getRandom(32));
}

console.log('int');
for(var i=0;i<10; i++){
    console.log(dbUtil.getIntRandom(32));
}

console.log('Alpha');
for(var i=0;i<10; i++){
    console.log(dbUtil.getAlphaRandom(32));
}