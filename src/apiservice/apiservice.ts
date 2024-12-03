const url="http://localhost:8080/api/";
export class ApiService {
  async apisendrequest(api: string, params: object) : Promise<object>{
    try {
      const response = await fetch(`${url}${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

     
      const login=response.json()
      return login; 
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

}
