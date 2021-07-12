<template>
  <div class="container">
    <div class="input-group my-3">
      <input
        type="text"
        class="form-control"
        placeholder="請輸入地點"
        v-model="place"
        @keyup.enter="findPlace(place)"
      />
      <button
        class="btn btn-outline-success"
        type="button"
        @click="findPlace(place)"
      >
        GO
      </button>
    </div>

    <button class="btn btn-primary" type="button" @click="heading -= 10">
      向西
    </button>
    <button class="btn btn-primary" type="button" @click="heading += 10">
      向東
    </button>

    <div ref="mapDiv" id="map" class="position-absolute w-50" />
    <img
      :src="imageUrl"
      alt="streetView"
      class="streetView position-absolute"
    />
  </div>
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
import {
  mapInit,
  findPlace,
  myLatlng,
  imageUrl,
  myAddress,
  renderView,
  changeAngle,
} from "../compositions/map";

export default {
  name: "streetMap",
  setup() {
    let mapDiv = ref(null);
    let place = ref(null);
    let heading = ref(0);

    mapInit(mapDiv);

    watch(myLatlng, (v) => {
      imageUrl.value = `https://maps.googleapis.com/maps/api/streetview?size=450x580&location=${v.lat},${v.lng}&heading=90&pitch=20&key=AIzaSyDFkrcN56LtUIPy-XN5YMs91feRs2aZURs`;
    });

    watch(myAddress, (v) => renderView(v));

    watch(heading, (v) => changeAngle(imageUrl, v));

    return { mapDiv, place, myLatlng, imageUrl, heading, findPlace };
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 90vh;
}
.streetView {
  display: block;
  width: 35%;
  height: 85%;
  top: 5rem;
  right: 15vh;
}
</style>
