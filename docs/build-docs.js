const path = require('path');
const fse = require('fs-extra');
const { promisify } = require('util');
const ejs = require('ejs');
const glob = promisify(require('glob'));

const pagesDir = path.join(__dirname, 'pages');
const outDir = path.join(__dirname, 'public');

async function build() {
  await fse.emptyDir(outDir);
  await fse.copy(path.join(__dirname, 'static'), outDir);

  const files = await glob('**/*.ejs', { cwd: pagesDir });
  files.forEach(async (file) => {
    const { dir, name } = path.parse(file);
    const destPath = name === 'index'
      ? path.join(outDir, dir)
      : path.join(outDir, dir, name);

    await fse.mkdirs(destPath);
    const output = await ejs.renderFile(path.join(pagesDir, file), {});
    await fse.writeFile(
      path.join(destPath, `index.html`),
      output
    );
  })
}

build();
