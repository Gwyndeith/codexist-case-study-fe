import axios from "axios";

const instance = axios.create({
	baseURL: process.env.VUE_APP_SPRING_SERVER_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const createInstance = () => {
	return {
		async getNearbyLocations(lat, lng, radius) {
			return instance.get("/findNearbyLocations/", {
				params: {
					latitude: lat,
					longitude: lng,
					radius: radius,
				},
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
		},
	};
};

export default createInstance;
