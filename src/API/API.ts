import axios from "axios";

const apiUrl = "https://elias1.bkx.es";
// const apiUrl = "http://localhost:3000";
const urlBuilder = (path: string) => `${apiUrl}/${path}`;

const headerBuilder = () => {
    const token = localStorage.getItem("token");
    return { headers: { authorization: token } };
};

const redirect = async (path:string)=>{
    await new Promise(() => { window.location.href = "#"+path })
    return;
}

export class API {
    static async get(path: string) {
        try {
            const response = await axios.get(urlBuilder(path), headerBuilder());
            if (response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return response;
        }
        catch (error: any) {
            if (error.response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return error.response;
        }
    }

    static async post(path: string, body: any) {
        try {
            const response = await axios.post(urlBuilder(path), body, headerBuilder());
            if (response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return response;
        }
        catch (error: any) {
            if (error.response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return error.response;
        }
    }

    static async put(path: string, body: any) {
        try {
            const response = await axios.put(urlBuilder(path), body, headerBuilder());
            if (response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return response;
        }
        catch (error: any) {
            if (error.response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return error.response;
        }
    }

    static async delete(path: string) {
        try {
            const response = await axios.delete(urlBuilder(path), headerBuilder());
            if (response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return response;
        }
        catch (error: any) {
            if (error.response.data?.isAuthorized === false) {
                redirect("/login");
            }
            return error.response;
        }
    }
}


