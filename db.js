
const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
  //主机
  host: 'localhost',
  //名称
  user: 'root',
  //密码
  password: 'root',
  //库名
  database: 'test_chao_db'
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
})

// 获取数据
function getData(sqlOv, callback) {
  let query = `SELECT * FROM ${sqlOv.table}`;
  if (sqlOv.condition) {
    query += ` ${sqlOv.condition}`;
  }
  connection.query(query, (error, results) => {
    callback(null, results);
  });
}

// 插入数据
function setData(sqlOv, callback) {
  let query = `INSERT INTO ${sqlOv.table} (${sqlOv.key}) `;
    if (sqlOv.condition) {
      query += `SET ? WHERE ${sqlOv.condition}`;
    }
    if(sqlOv.value){
      query += `VALUES (${sqlOv.value})`
    }
    connection.query(query, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

// 删除数据
function deleteData(sqlOv, callback) {
  let query = `DELETE FROM ${sqlOv.table} WHERE id = ?`;
    connection.query(query, [sqlOv.value], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

// 更新数据
function updateData(id, callback) {
  //...
}

module.exports = {
  getData,
  setData,
  updateData,
  deleteData
};