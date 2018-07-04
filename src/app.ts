import express from "express"
import yargs from "yargs"
import path from "path"
import { getTx } from "./tx"

let { d: DIR, p: PORT } = yargs(process.argv)
	.coerce('dir', path.resolve)
	.option('d', {
		alias: "dir",
		demand: true,
		type: "string",
		describe: "directory where application logs are located"
	})
	.option('p', {
		alias: "port",
		demand: false,
		default: 4007,
		type: "number",
		describe: "port to listen on"
	})
	.argv as any as { d: string, p: number }

let app = express()

app.get('/tx/:txid', async (req, res) =>
{
	let { txid } = req.params as { txid: string }
	
	getTx(DIR, txid)
		.then(tx => JSON.parse(tx))
		.then(tx => res.json({ tx }))
		.catch(err => res.json({ error: err }))
})

console.log(`running applog server for ${DIR}`)
app.listen(PORT, () =>
{
	console.log(`server listening on ${PORT}`)
})