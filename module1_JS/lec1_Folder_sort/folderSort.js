const fs = require('fs');
const path = require('path');
let extensions = require('./util');
let folderPath = "./testFolder";

function moveFile (fileName, srcPath, destPath) {
    let src = `${srcPath}/${fileName}`;
    let dest = `${destPath}/${fileName}`;
    // console.log(`src: ${src}`);
    // console.log(`dest: ${dest}`);
    // copy paste file
    fs.copyFileSync (src, dest);

    // delete file
    fs.unlinkSync (src);
}

function createFolder (newFolderPath) {
    fs.mkdirSync(newFolderPath);
}

function checkFolder (content, extPath, extension) {
    // check if extension is matching with any of folderName
    let newFolderPath;
    for (let key in extensions) {
        if (extensions[key].includes(extension)) {
            newFolderPath = `${extPath}/${key}`;
            break;
        }
    }
    let isFolderPresent = fs.existsSync(newFolderPath);

    if (!isFolderPresent) 
        createFolder (newFolderPath);
    
    moveFile (content, extPath, newFolderPath);
}

function sortFolder (folderPath) {
    // get content of folderPath
    let content = fs.readdirSync (folderPath);
    for (let i = 0; i < content.length; ++i) {
        let temp = content[i];
        let size = temp.split('.').length;
        
        if (size === 1) {
            if (content[i] in extensions) 
                continue;
            
            console.log (`${folderPath}/${content[i]}`);
            sortFolder (`${folderPath}/${content[i]}`);
        } else {
            let extensionName = path.extname(content[i]);
            // console.log(extensionName);
            checkFolder (content[i], folderPath, extensionName);
        }
    }
}

sortFolder (folderPath);