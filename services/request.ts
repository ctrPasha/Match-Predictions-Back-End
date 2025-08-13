// DO something similar to the get and post methods that we did in the front end
import axios from "axios";
import { getConfig }from './config'

export async function get(endpoint: string): Promise<any> {
	try {
		const config = await getConfig();
		const res = await axios.get<any>(`${endpoint}`, {
			headers: {
				'X-Auth-Token': config.apiKey
			}
		});
		console.log(res.data);
		return res.data;
		/*	
		return await new Promise(async (resolve, reject) => {
			this.http.get<any>(`${this.url}/${endpoint}`).subscribe(
				(data: any) => resolve(data),
				(error: any) => reject(error)
			);
		});*/

	} catch (err) {
		console.log("GET: ", err);
		throw err;
	}
}

export async function post(endpoint: string, payload: any = {}): Promise<any> {
	try {
		const res = await axios.post<any>(`/${endpoint}`, payload);
		return res.data;
		//return await new Promise(async (resolve, reject) => {
		// (`${url}/${endpoint}`, payload)
	} catch (err) {
		console.log("POST: ", err);
		throw err;
	}
}
