<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
// import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import createInstance from "../Api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
// import axios from "axios";

const center = { lat: 40.999475649442175, lng: 29.071924563270844 };
let currPos = ref({ lat: 40.99949752297587, lng: 29.071944896190892 });
let map = ref(null);
let mapDiv = ref(null);
let axiosInstance = createInstance();
let searchAreaCircle = ref(null);
// eslint-disable-next-line no-unused-vars
let nearbyLocationList = ref([]);
let nearbyLocationMarkerList = ref([]);

async function centerMapToSelectedLocation(targetLat, targetLng, targetRadius) {
	//Send the request here and get the result from BE
	let nearbyLocationList = await axiosInstance
		.getNearbyLocations(targetLat, targetLng, targetRadius)
		.then((result) => {
			return result.data;
		});
	console.log(nearbyLocationList);
	currPos = computed(() => ({
		lat: parseFloat(targetLat),
		lng: parseFloat(targetLng),
	}));
	map.value = new google.maps.Map(mapDiv.value, {
		center: currPos.value,
		zoom: 16,
	});
	// searchAreaCircle.value.setMap(null);
	searchAreaCircle.value = new google.maps.Circle({
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.35,
		map: map.value,
		center: currPos.value,
		radius: +targetRadius,
	});

	nearbyLocationMarkerList.value = [];

	nearbyLocationList.forEach((element) => {
		nearbyLocationMarkerList.value.push(
			new google.maps.Marker({
				position: {
					lat: parseFloat(element.latitude),
					lng: parseFloat(element.longitude),
				},
				title: element.name,
				map: map.value,
			})
		);
	});
}

export default {
	name: "MapScreen",
	components: {},
	props: {
		msg: String,
		center: center,
		googleMapsAPIKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
	},

	setup() {
		currPos = computed(() => ({
			lat: 40.99949752297587,
			lng: 29.071944896190892,
		}));

		const loader = new Loader({
			apiKey: "AIzaSyCO8pORQrIxc8nb7Bj04XMYvAVwXznDU3A",
		});
		mapDiv = ref(null);
		map = ref(null);
		let clickListener = null;

		onMounted(async () => {
			await loader.load();
			map.value = new google.maps.Map(mapDiv.value, {
				center: currPos.value,
				zoom: 20,
			});
		});

		onUnmounted(async () => {
			if (clickListener) clickListener.remove();
		});

		let line = null;
		let currMarker = null;
		let otherMarker = null;
		watch([map, currPos], () => {
			if (line) line.setMap(null);
			if (otherMarker) otherMarker.setMap(null);
			if (currMarker) currMarker.setMap(null);
			if (map.value != null)
				currMarker = new google.maps.Marker({
					position: { lat: currPos.value.lat, lng: currPos.value.lng },
					map: map.value,
				});
		});
		return { currPos, mapDiv, centerMapToSelectedLocation };
	},
};
</script>

<template>
	<div class="hello">
		<div>
			<h4>Your Position</h4>
			Latitude: {{ currPos.lat }}
			<br />
			Longitude: {{ currPos.lng }}
			<br />
			<br />
			<div style="display: flex; justify-content: center">
				<div style="display: block; width: 10vw">
					<label style="display: block; text-align: center">Latitude:</label>
					<input type="text" v-model="targetLat" />
				</div>
				<br />
				<br />
				<div style="display: block; width: 10vw">
					<label style="text-align: center">Longitude:</label>
					<input type="text" v-model="targetLng" />
				</div>
				<br />
				<br />
				<div style="display: block; width: 10vw">
					<label style="text-align: center">Radius:</label>
					<input type="text" v-model="targetRadius" />
				</div>
			</div>
			<br />
			<button
				class="btn btn-primary"
				@click="centerMapToSelectedLocation(targetLat, targetLng, targetRadius)"
			>
				Search Nearby Locations
			</button>
		</div>
		<div id="mapContainer" style="display: flex; justify-content: center">
			<div
				ref="mapDiv"
				style="
					width: 70vw;
					height: 60vh;
					margin-top: 2vh;
					margin-bottom: 2vh;
					display: flex;
					justify-content: center;
					border-radius: 20px;
					border-width: 1px;
					border-color: grey;
					border-style: solid;
				"
			></div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
