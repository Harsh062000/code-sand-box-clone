import child_process, { exec } from 'child_process';
import util from 'util';

export const execPromisified = util.promisify(child_process.exec);