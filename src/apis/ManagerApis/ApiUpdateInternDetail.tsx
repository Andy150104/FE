import axios, { AxiosError } from "axios";
import ActivitesRequest from "../../model/ActivitesRequest";
import InternDetailRequest from "../../model/Mentor/InternDetailRequest";

export const ApiUpdateInternDetail = async (internDetailRequest: InternDetailRequest, internId: number) => {
    try {
        const response = await axios.put(`http://localhost:8080/internbridge/manager/intern/internDetail/update/${internId}`, internDetailRequest, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {

                throw new Error(error.response.data);
            } else if (error.request) {
                throw new Error("No response received from the server");
            } else {
                throw new Error("Error in setting up the request");
            }
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
