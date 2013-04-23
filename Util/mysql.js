/**
 * Created with JetBrains WebStorm.
 * User: Cris.dai
 * Date: 13-4-19
 * Time: 上午9:24
 * To change this template use File | Settings | File Templates.
 */

var dbConfig = require('../DBConfig.js'),
    mysql = require('mysql'),
    util = require('util'),
    client = mysql.createConnection(dbConfig, function(err){
        console.log(err);

    });

exports.createTable= function(tableName,fields){
    var param = util.format('CREATE TABLE %s', tableName,util.format('(%s)', fields.join(',')));
    client.query(
        param, function(err){
            console.log(err);
     });
};

exports.insert=function(tableName, fields){
    var cmdParam = util.format('INSERT INTO %s SET ',tableName),
        params = [];
    fields.forEach(function(field){
        params.push([field.key,field.value].join('='));
    });
    cmdParam += params.join(',');
    client.query(
       cmdParam, function(err){
            console.log(err);
        }
    );
};

exports.select = function(tableName,fields,strict,callback){
    var cmdParam =util.format('SELECT %s FROM %s',fields?fields.join(','):'*',tableName);
    if(strict){
        cmdParam += 'WHERE ' + strict;
    }
    client.query(cmdParam,callback || function(err, results, fields){
        if (err) {
            throw err;
        }
        console.log(results);
        console.log(fields);
        client.end();
    });
};
