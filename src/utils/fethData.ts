// export function getData<T>(link : string): Promise<T> {
//   return fetch(link)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Error fetch data!');
//       }
//       return response.json();
//     });
// }

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
    url: string,
    method: RequestMethod = 'GET',
    data: any = null): Promise<T | null> {
    const options: RequestInit = { method };

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
    }
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.text().then((text) => {
                    let message;
                    try {
                        const json = JSON.parse(text);
                        message = json?.detail || JSON.stringify(json);
                    } catch (e) {
                        message = text || response.statusText || "Request failed";
                    }
                    throw new Error(message);
                });
            }

            if (response.status === 204){
                return null
            }
            return response.json() ;
        });
}

export const client = {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
    patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
    delete: (url: string) => request(url, 'DELETE'),
};





