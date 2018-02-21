const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const path = require(`path`);

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const EXTENSION_MAP = {
  '.css': `text/css`,
  '.html': `text/html`,
  '.jpg': `image/jpeg`,
  '.jpeg': `image/jpeg`,
  '.png': `image/png`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`,
};

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const printDirectory = (path, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const readFile = async (filepath, res) => {
  const data = await readfile(filepath);
  const extension = path.extname(filepath);
  res.setHeader(`content-type`, EXTENSION_MAP[extension] || `text/plain`);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};


const readDir = async (path, res) => {
  const files = await readdir(path);
  res.setHeader(`content-type`, `text/html`);
  const content = printDirectory(path, files);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const staticFolder = `${process.cwd()}/static`;

const server = http.createServer((req, res) => {
  const absolutePath = staticFolder + url.parse(req.url).pathname;

  (async () => {
    try {
      const pathStat = await stat(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    server.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  }
};
