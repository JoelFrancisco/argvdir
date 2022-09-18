import path from 'path'
import fs from 'fs/promises'
import { spawnSync } from 'child_process'

let files = [];

async function getAllFilesRecursively(dir) {
  const res = await fs.readdir(dir);
  for (const item of res) {
    const absolutePath = path.join(dir, item)

    const stat = await fs.stat(absolutePath)
    if (stat.isDirectory()) {
      await getAllFilesRecursively(absolutePath)
    }
    else {
      files.push(absolutePath)
    }
  }
}

const command = process.argv[2]
const dir = process.argv[3]

await getAllFilesRecursively(dir)

const { error, stdout, stderr } = spawnSync(command, files, { encoding: 'utf8' })
if (stderr || error) {
  console.log(error)
  console.log(stderr)
}
else {
  console.log(stdout)
}
