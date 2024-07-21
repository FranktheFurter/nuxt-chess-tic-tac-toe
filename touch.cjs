const fs = require("fs")
const path = process.argv[2]

fs.closeSync(fs.openSync(path, "w"))
