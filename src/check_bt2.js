const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

let count = 0, inStr = false, inTpl = false, prev = '';
for (let i = 0; i < js.length; i++) {
    const c = js[i];
    if (c === '`' && prev !== '\\') {
        inTpl = !inTpl;
        if (!inTpl) {
            // Template just ended, check if next meaningful char is ';'
            count++;
        } else {
            // Entered template
            count++;
        }
    }
    prev = c;
}
console.log('Total backticks:', count, count % 2 === 0 ? 'OK' : 'ODD!');
