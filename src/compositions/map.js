/* eslint-disable no-undef */
import { ref, reactive, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { API_KEY } from "../../api";

const loader = new Loader({ apiKey: API_KEY });
let map = ref(null);
let marker = ref(null);

export const myLatlng = reactive({ lat: 25.0338041, lng: 121.5645561 });
export let myAddress = ref("");
export let imageUrl = ref(
  "https://i.postimg.cc/k5mzx07M/BB6-C4-A4-D-764-A-44-AA-9-CC5-899-BD6-F0836-E.jpg"
);

export const mapInit = (mapDiv) => {
  onMounted(async () => {
    await loader.load();
    // map
    map.value = new google.maps.Map(mapDiv.value, {
      center: { lat: 25.0338041, lng: 121.5645561 },
      zoom: 18,
    });
    // marker
    marker.value = new google.maps.Marker({
      position: myLatlng,
      map: map.value,
      draggable: true,
      icon: "https://i.postimg.cc/4dsBcpz7/rocket-2.png",
      title: "my position",
    });
    map.value.panTo(marker.value.getPosition());
    // marker event
    marker.value.addListener("dragend", dragMarker);
  });
};

export const dragMarker = (e) => {
  const { lat, lng } = e.latLng.toJSON();

  map.value.setCenter(marker.value.getPosition());
  myLatlng.lat = lat;
  myLatlng.lng = lng;
};

export const findPlace = (place) => {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: place }).then(({ results }) => {
    const res = results[0].geometry;
    map.value.setCenter(res.location);
    marker.value.setPosition(res.location);
    myAddress.value = place;
  });
};

export async function renderView(addr) {
  let res = await fetch(
    `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${addr}&heading=-45&pitch=42&fov=110&key=${API_KEY}`
  );
  let data = await res.json();

  if (data.status === "NOT_FOUND" || data.status === "ZERO_RESULTS") {
    imageUrl.value =
      "https://i.postimg.cc/k5mzx07M/BB6-C4-A4-D-764-A-44-AA-9-CC5-899-BD6-F0836-E.jpg";
    return;
  }
  imageUrl.value = `https://maps.googleapis.com/maps/api/streetview?size=450x580&location=${addr}&heading=90&pitch=-0.76&key=${API_KEY}`;
}

export const changeAngle = (url, v) => {
  let urlArray = url.value.split("&");

  urlArray.splice(2, 1, `heading=${v}`);
  imageUrl.value = urlArray.join("&");
};
