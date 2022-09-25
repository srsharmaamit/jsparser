import * as esprima from "esprima";
import * as escodegen from "escodegen";
import {readFromFile, writeToFile} from '../nodeApi.js';


// Write a code to remove all comments
const filePath = 'example1/main.js';
const fileContent = readFromFile(filePath);
const ast = esprima.parse(fileContent, {comment: true});
ast.comments = [];
const newCode = escodegen.generate(ast);
writeToFile(filePath, newCode);



