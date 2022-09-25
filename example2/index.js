import * as esprima from "esprima";
import * as escodegen from "escodegen";
import {readFromFile, writeToFile} from '../nodeApi.js';

const filePath = 'example2/main.js';
let sourceNew ='';

let source = readFromFile(filePath);
const tokens = esprima.tokenize(source, { range: true, comment: true });
const ids = tokens.filter(x => {
    if(x.type === 'LineComment') {
        return x.value === 'DO_NOT_REMOVE';
    } else {
        return true;
    }
});
ids.forEach(t => {
    if(t.type === 'LineComment') {
        t.value = '//'+ t.value + ' \n ';
    }
    sourceNew = sourceNew + ' ' +t.value ;
});

const ast  = esprima.parse(sourceNew,  {range: true, tokens: true, comment: true});
escodegen.attachComments(ast, ast.comments, ast.tokens);
const newCode = escodegen.generate(ast, {comment: true, format: {
        indent: {
            style: '    ',
            base: 0,
            adjustMultilineComment: false
        },
        newline: '\n',
        space: ' ',
        json: false,
        renumber: false,
        hexadecimal: false,
        quotes: 'single',
        escapeless: false,
        compact: false,
        parentheses: true,
        semicolons: true,
        safeConcatenation: false
    },});
writeToFile(filePath, newCode);