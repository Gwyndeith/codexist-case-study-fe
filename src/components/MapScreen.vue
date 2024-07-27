<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
// import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";

const center = { lat: 40.999475649442175, lng: 29.071924563270844 };
let currPos = ref({ lat: 40.99949752297587, lng: 29.071944896190892 });

function centerMapToSelectedLocation(targetLat, targetLng) {
	currPos = { lat: targetLat, lng: targetLng };
	console.log(currPos);
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
		const otherPos = ref({ lat: 40.99949752297587, lng: 29.071944896190892 });

		const loader = new Loader({
			apiKey: "AIzaSyCO8pORQrIxc8nb7Bj04XMYvAVwXznDU3A",
		});
		const mapDiv = ref(null);
		let map = ref(null);
		let clickListener = null;

		onMounted(async () => {
			await loader.load();
			map.value = new google.maps.Map(mapDiv.value, {
				center: currPos.value,
				zoom: 20,
			});
			map.value.clickListener = map.value.addListener(
				"click",
				({ latLng: { lat, lng } }) => {
					otherPos.value = { lat: lat(), lng: lng() };
				}
			);
		});

		onUnmounted(async () => {
			if (clickListener) clickListener.remove();
		});

		let line = null;
		let currMarker = null;
		let otherMarker = null;
		watch([map, currPos, otherPos], () => {
			if (line) line.setMap(null);
			if (otherMarker) otherMarker.setMap(null);
			if (currMarker) currMarker.setMap(null);
			if (map.value && otherPos.value != null)
				line = new google.maps.Polyline({
					path: [currPos.value, otherPos.value],
					map: map.value,
				});
			currMarker = new google.maps.Marker({
				position: { lat: currPos.value.lat, lng: currPos.value.lng },
				map: map.value,
			});
			otherMarker = new google.maps.Marker({
				position: { lat: otherPos.value.lat, lng: otherPos.value.lng },
				map: map.value,
			});
		});
		return { currPos, otherPos, mapDiv, centerMapToSelectedLocation };
	},
};
</script>

<template>
	<div class="hello">
		<div>
			<h4>Your Position</h4>
			Latitude: {{ currPos.lat }}, Longitude:
			{{ currPos.lng }}
			<br />
			<div style="display: block; align-content: center">
				<label style="min-width: 300px">Latitude:</label>
				<input type="text" v-model="targetLat" />
				<br />
				<label style="width: 250px">Longitude:</label>
				<input type="text" v-model="targetLng" />
			</div>
			<button @click="centerMapToSelectedLocation(targetLat, targetLng)">
				Search Nearby Locations
			</button>
		</div>
		<div>
			<h4>Clicked Position</h4>
			<span v-if="otherPos">
				Latitude: {{ otherPos.lat }}, Longitude:
				{{ otherPos.lng }}
			</span>
			<span v-else>Click the map to select a position</span>
		</div>
		<div ref="mapDiv" style="width: 100%; height: 60vh"></div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
