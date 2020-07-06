exports.dotProduct = dotProduct;
exports.l2norm = l2norm;
exports.randMatrix = randMatrix;
exports.scalarScale = scalarScale;
exports.transpose = transpose;
exports.reshape = reshape;
exports.matrixProduct = matrixProduct;
exports.identity = identity;
exports.diag = diag;
exports.trace = trace;
exports.frobeniusNorm = frobeniusNorm;
exports.sumMatrix = sumMatrix;
exports.diffMatrix = diffMatrix;
exports.matrixVectorProduct = matrixVectorProduct;
exports.kroneckerProduct = kroneckerProduct;

/* Takes in any quantity of numbers and returns an array */
const makeArray = (...values) => {return values};

/* Computes the dot product of two 1-d arrays */
function dotProduct(arr1, arr2) {
  var accum = 0;
  for (var j = 0; j < arr1.length; j++) {
    accum += arr1[j] * arr2[j];
  }
  return accum;
}

/* Compute L2 norm of 1-d array. */
function l2norm(arr) {
  return Math.sqrt(dotProduct(arr, arr));
}

/* Checks if the input matrix is a matrix of numbers.
 * Returns array: [number of rows, number of columns] */
function matrixHelper(matrix) {
	var rows;
	var cols;
	try {
		rows = matrix.length;
		cols = matrix[0].length;
	}
	catch (e) {
		throw new Error("Invalid Input.");
	}
	finally {
		if (cols == 0) {throw new Error("Invalid Input.");}
		for (var x = 0; x < rows; x++) {
			for (var y = 0; y < cols; y++) {
				if (typeof matrix[x][y] != 'number') {
					throw new Error("Invalid Input.");
				}
			}
		}
	}
	return [rows, cols];

}

/* Parameters: number of rows, number of columns
   Output: Matrix with specified dimensions with
   values randomly generated from interval [0, 1) */
function randMatrix(rows, cols) {
   var matrix = [];
   for (var x = 0; x < rows; x++) {
     matrix.push([]);
     for (var y = 0; y < cols; y++) {
        matrix[x].push(Math.random());
     }
   }
   return matrix;
}



/* Parameters: 2-D Matrix, scalar to scale entries by */
/* Output: scaled 2-D matrix */
function scalarScale(matrix, scalar) {
  if (typeof scalar != 'number') {throw new Error("Invalid Input.");}
  var arr = matrixHelper(matrix);
	var rows = arr[0];
	var cols = arr[1];
  var tMatrix = [];

  for (var row = 0; row < rows; row++) {
    tMatrix.push([]);
    for (var col = 0; col < cols; col++) {
      tMatrix[row].push(matrix[row][col] * scalar);
    }
  }
  return tMatrix;

}

/* Parameters: 2-D Matrix
 * Output: Transpose of Matrix */

function transpose(matrix) {

	var arr = matrixHelper(matrix);
	var rows = arr[0];
	var cols = arr[1];
	var tMatrix = [];
	for (var x = 0; x < cols; x++) {
		tMatrix.push([]);
	}
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			tMatrix[col].push(matrix[row][col]);
		}
	}
	return tMatrix;
}

/* Parameters: 2-D Matrix, x rows, y columns
 * Output: Reshaped Matrix */

function reshape(matrix, x, y) {

	var arr = matrixHelper(matrix);
	var rows = arr[0];
	var cols = arr[1];
	if (x*y != rows * cols) {
		throw new Error("Invalid Input.");
	}
	shapedMatrix = [];

	var currRow = 0;
	var currCol = 0;
	for (var j = 0; j < x; j++) {
    shapedMatrix.push([]);
		for (var k = 0; k < y ; k++) {
			shapedMatrix[j].push(matrix[currRow][currCol]);
			currCol = (currCol + 1) % cols;
			if (currCol == 0) {
				currRow ++;
			}
		}
	}

	return shapedMatrix;

}

/* Parameters: 2-D Matrix, 2-D Matrix
   Output: Product of the two matrices. */

function matrixProduct(matrix1, matrix2) {

	var arr1 = matrixHelper(matrix1);
	var arr2 = matrixHelper(matrix2);
	var rows1 = arr1[0];
	var rows2 = arr2[0];
	var cols1 = arr1[1];
	var cols2 = arr2[1];

	if (cols1 != rows2) {
		throw new Error("Invalid Input.");
	}

	product = [];
	for (var i = 0; i < rows1; i++) {
		product.push([]);
	}

	var currRow = 0;
	var transpose2 = transpose(matrix2);
	for (var row of matrix1) {
		for (var col of transpose2) {
			product[currRow].push(dotProduct(row, col));
		}
		currRow++;
	}

	return product;

}

/* Parameters: nonegative integer, d
   Output: identity of d x d dimensions*/

function identity(d) {

	if (typeof(d) != 'number' || d <= 0) {throw new Error("Invalid Input.");}

	id = [];
	for (var x = 0; x < d; x++) {
		currArr = [];
		for (var y = 0; y < d; y++) {
			if (y == x) {
				currArr.push(1);
			}
			else {
				currArr.push(0);
			}
		}
		id.push(currArr);
	}

	return id;

}

/* Parameters: array of numbers
   Output: square matrix with elements of the array as elements of the
   diagonal */

function diag(arr) {

	if (arr.length == 0) {throw new Error("Invalid Input.");}
	for (var x of arr) {
		if (typeof(x) != 'number') {
			throw new Error("Invalid Input.");
		}
	}

	id = [];
	for (var x = 0; x < arr.length; x++) {
		currArr = [];
		for (var y = 0; y < arr.length; y++) {
			if (y == x) {
				currArr.push(arr[x]);
			}
			else {
				currArr.push(0);
			}
		}
		id.push(currArr);
	}

	return id;

}


/* Parameters: matrix
   Output: trace of matrix */
function trace(matrix){
	var arr = matrixHelper(matrix);
	var rows = arr[0];
	var cols = arr[1];
	if (rows != cols) {throw new Error("Input must be a square matrix.");}
	var toReturn = 0.0;
	for (var x = 0; x < rows; x++) {
		for (var y = 0; y < cols; y++) {
			if (x == y) {
				toReturn += matrix[x][y];
			}
		}
	}
	return toReturn;
}

/* Parameters: matrix
   Output: frobenius norm of matrix
*/
function frobeniusNorm(matrix){
	return Math.sqrt(trace(matrixProduct(transpose(matrix), matrix)));
}

/* Parameters: two matrices of the same dimensions
   Output: sum of matrices */
function sumMatrix(matrix1, matrix2) {
  var arr1 = matrixHelper(matrix1);
  var arr2 = matrixHelper(matrix2);
  var rows1 = arr1[0];
  var rows2 = arr2[0];
  var cols1 = arr1[1];
  var cols2 = arr2[1];
  if (rows1 != rows2 || cols1 != cols2) {
    throw new Error("Invalid Input.");
  }
  var sum = [];
  for (var x = 0; x < rows1; x ++) {
    sum.push([]);
    for (var y = 0; y < cols1; y++) {
      sum[x].push(matrix1[x][y] + matrix2[x][y]);
    }
  }
  return sum;
}

/* Parameters: two matrices of the same dimensions
   Output: difference of the matrices */
function diffMatrix(matrix1, matrix2) {
  var arr1 = matrixHelper(matrix1);
  var arr2 = matrixHelper(matrix2);
  var rows1 = arr1[0];
  var rows2 = arr2[0];
  var cols1 = arr1[1];
  var cols2 = arr2[1];
  if (rows1 != rows2 || cols1 != cols2) {
    throw new Error("Invalid Input.");
  }
  var diff = [];
  for (var x = 0; x < rows1; x ++) {
    diff.push([]);
    for (var y = 0; y < cols1; y++) {
      diff[x].push(matrix1[x][y] - matrix2[x][y]);
    }
  }
  return diff;
}

/* Parameters: 2-D matrix, 1-D array
  Output: Computer matrix-vector product; returns vector in 1-D array-form. */

function matrixVectorProduct(matrix, vector) {
    if (vector.length == 0) {throw new Error("Invalid Input.");}
    var colVector = [];
    for (var elem of vector) {
      if (typeof elem != 'number') {
        throw new Error("Invalid Input.");
      }
      colVector.push([elem]);
    }
    var colProduct = matrixProduct(matrix, colVector);
    var result = [];
    for (var elem of colProduct) {
      result.push(elem[0]);
    }
    return result;
}


function kroneckerProduct(matrix1, matrix2) {

  var arr1 = matrixHelper(matrix1);
  var arr2 = matrixHelper(matrix2);
  var m = arr1[0];
  var p = arr2[0];
  var n = arr1[1];
  var q = arr2[1];
  var kpMatrix = [];

  for (var i = 0; i < m; i++) {
    for (var j = 0; j < p; j++) {
      kpMatrix.push([]);
    }
  }

  for (var x = 0; x < m; x++) {
    for (var y = 0; y < n; y++) {

        var curr = scalarScale(matrix2, matrix1[x][y]);
        for (var i = 0; i < p; i++) {
          for (var j = 0; j < q; j++) {
              kpMatrix[x*p + i].push(curr[i][j]);
          }
        }

    }
  }

  return kpMatrix;


}
