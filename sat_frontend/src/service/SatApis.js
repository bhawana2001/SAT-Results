import axios from "axios"

const Base_Url = "http://localhost:8081/api/v1/satresults";

class SatResults {

    //insert data
    insertData(Data) {
        return axios.post(Base_Url, Data);
    }
    //get all data
    getAllData() {
        return axios.get(Base_Url);
    }
    //delete data by name
    async deleteResultByName(name) {
        try {
            const response = await axios.delete(`${Base_Url}/${name}`);
            return response.data;
        } catch (error) {
            // Handle errors or throw an error
            throw new Error('Could not delete result:', error);
        }
    }

    //fetch rank by name
    async getRankByName(name) {
        try {
            const response = await axios.get(`${Base_Url}/rank/${name}`);
            return response.data;
        } catch (error) {
            // Handle errors or throw an error
            throw new Error('Could not fetch rank:', error);
        }
    }

    //update score by name
    async updateScoreByName(name, newScore) {
        try {
          const response = await axios.put(`${Base_Url}/${name}`, { satScore: newScore });
          return response.data;
        } catch (error) {
          throw new Error('Could not update score:', error);
        }
      }
}
// eslint-disable-next-line 
export default new SatResults();