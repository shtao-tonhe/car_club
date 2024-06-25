
function apiResutlOv( error, resultData ) {
  if( error ){
    return {
      code: 500,
      msg: 'serve error',
    }
  }else{
    return {
      code: 200,
      msg: 'success',
      data: resultData
    }
  }
}

function insetDBValue( params ) {
  // 将对象的值取出来
  let paramsArr = [];
  for( let key in params ){
    paramsArr.push(`'${params[key]}'`);
  }
  return paramsArr.toString()
}

module.exports = {
  apiResutlOv,
  insetDBValue,
};