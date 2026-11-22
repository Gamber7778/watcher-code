import {execFileSync} from 'node:child_process';
import {rmSync} from 'node:fs';
rmSync('public/school',{recursive:true,force:true});
execFileSync(process.execPath,['journal/build.mjs','--out','public/school','--base','/','--origin','https://zeland.it.com'],{stdio:'inherit'});
