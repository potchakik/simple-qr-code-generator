import { createServer } from "http";
import QRCode from "qrcode";

createServer(function handler(req, res) {
  const url = new URL(req.url, "http:/localhost:8888");
  const data = url.searchParams.get("data");

  if (!data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
            <html>
            <body>
            <p>To use this app you need to set the <code>data</code> querystring</p>
            <p>Try for example <a href="/?data=hello">/?=data=hello</a></p>
            </body>
            </html>
        `);
  }
  res.writeHead(200, { "Content-Type": "image/png" });
  QRCode.toFileStream(res, data, { width: 300 });
}).listen(8888);
