/**
 * Created with JetBrains WebStorm.
 * User: Cris.dai
 * Date: 13-4-19
 * Time: 下午2:20
 * To change this template use File | Settings | File Templates.
 */

/*产生一个32位的随机数，*/
var rand = (function(){
    var randArr ={int:[],alpha:[],total:[]},
        intStart = '0'.charCodeAt(0),
        intEnd = '9'.charCodeAt(0),
        alphaStart='a'.charCodeAt(0),
        alphaEnd = 'z'.charCodeAt(0);
    for(;intStart<=intEnd;intStart++){
        randArr.int.push(String.fromCharCode(intStart));
    }
    for(;alphaStart<=alphaEnd;alphaStart++){
        randArr.alpha.push(String.fromCharCode(alphaStart));
    }
    randArr.total = randArr.int.concat(randArr.alpha);
    return randArr;
})();

module.exports = {
    getRandom: function(len,temp){
        var index, ran, result=[];
        temp = temp || rand.total;
        for(index=0; index<len;index++){
            ran = Math.floor(temp.length * Math.random());
            result.push(temp[ran]);
        }
        return result.join('');
    },
    getIntRandom: function(len){
        return this.getRandom(len, rand.int);
    },
    getAlphaRandom: function(len){
        return this.getRandom(len, rand.alpha);
    }
};
