import fs from "fs"

export function getTx(rootDir: string, txid: string): Promise<string>
{
	return readFileAsync(`${rootDir}/${txid}.json`)
}
export function readFileAsync(path: string): Promise<string>
{
	return new Promise<string>((res, rej) => fs.exists(path, exists => !exists ? res("null") : fs.readFile(path, (err, data) =>
	{
		if (err)
			return rej(err)
		
		if (!data)
			return rej(`couldn't read file ${path}`)
		
		return res(data.toString())
	})))
}