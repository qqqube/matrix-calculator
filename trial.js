var ind = require('./index.js');


var matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

console.log(ind.transpose(matrix1));

console.log(ind.reshape(matrix1, 3, 4));

var matrix2 = [[1, 2, 3], [4, 5, 6]];

console.log(ind.transpose(matrix2));

console.log(ind.reshape(matrix2, 3, 2));

var matrix3 = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];

console.log(ind.matrixProduct(matrix2, matrix3));

console.log(ind.identity(1));

console.log(ind.identity(6));

console.log(ind.diag([1, 2, 3]));

console.log(ind.diag([1]));

console.log(ind.diag([1, 2, 3, 3, 2, 1]));

console.log(ind.trace(matrix3));

console.log(ind.trace(ind.identity(4)));

console.log(ind.trace(ind.identity(1)));

console.log(ind.frobeniusNorm(ind.identity(5)));

console.log(ind.frobeniusNorm([[1, 2, 3]]));

console.log(ind.scalarScale(matrix3, 2));

console.log(ind.randMatrix(2, 2));

console.log(ind.randMatrix(8, 2));

console.log(ind.sumMatrix(ind.identity(6), ind.identity(6)));

console.log(ind.diffMatrix(ind.identity(6), ind.identity(6)));


console.log(ind.dotProduct([1, 2, 3, 4], [1, 1, 1, 1]));


console.log(ind.matrixVectorProduct([[1, 2, 3], [4, 5, 6]], [1, 2, 3]));

console.log(ind.l2norm([1, 2, 3]));

console.log(ind.kroneckerProduct([[1, 2], [1, 2]], [[1, 2], [1, 2]]));

console.log(ind.kroneckerProduct([[1, 2], [1, 2], [1, 2]], [[1, 2], [1, 2]]));

console.log(ind.kroneckerProduct([[1, 2], [3, 4]], [[0, 5], [6, 7]]));

console.log(ind.kroneckerProduct([[1, 2], [3, 4], [1, 0]], [[0, 5, 2], [6, 7, 3]]));

console.log(ind.kroneckerProduct(ind.identity(3), ind.identity(2)));
