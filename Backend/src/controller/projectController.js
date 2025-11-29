import util from 'util';
import child_process, { exec } from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';


const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req,res) => {
     
    //create a unique id and then inside the project folder create a new folder with that id
    const projectId = uuid4();

    console.log('new project Id:', projectId);

    await fs.mkdir(`./projects/${projectId}`);

    //after this call the npm create vite command in the newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}`
    })

    return res.json({messsage: 'Project created successfully', data: projectId});
};