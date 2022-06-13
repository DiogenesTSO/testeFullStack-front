
<script>


// export default {
//   name: 'ImobiaMapa',
//   props: {
//     value: {
//       type: Object,
//       default: () => ({ latitude: null, longitude: null }),
//     },
//     endereco: {
//       type: String,
//       default: '',
//     },
//   },

//   data() {
//     return {
//       enderecoCmp: this.endereco,
//       componentesEndereco: [],
//       geocoder: {},
//       latitude: this.value.latitude,
//       longitude: this.value.longitude,
//       map: {},
//       marker: {},
//       addressFields: {
//         administrative_area_level_1: 'uf',
//         administrative_area_level_2: 'cidade',
//         country: 'pais',
//         political: 'bairro',
//         postal_code: 'cep',
//         route: 'rua',
//         street_number: 'numero',
//       },
//     }
//   },
//   computed: {
//   },
//   watch: {
//     endereco() {
//       this.carregarEnderecoNoMapaDelay()
//       this.enderecoCmp = this.endereco
//     },
//     value: {
//       handler() {
//         this.latitude = this.value.latitude
//         this.longitude = this.value.longitude
//       },
//       deep: true,
//     },
//     'value.latitude'() {
//       this.setMapPosition(this.latitude, this.longitude)
//     },
//     'value.longitude'() {
//       this.setMapPosition(this.latitude, this.longitude)
//     },
//   },

// mounted() {
//   loadedGoogleMapsAPI
//     .then(() => this.initMap())
//     .then(() => {
//       if (this.value.latitude && this.value.longitude) {
//         this.setMapPosition(this.value.latitude, this.value.longitude)
//       } else {
//         this.carregarEnderecoNoMapa()
//       }
//     })
// },
// methods: {
//     initMap() {
//       const latlng = new window.google.maps.LatLng(
//         this.latitude,
//         this.longitude,
//       )
//       const options = {
//         zoom: 14,
//         center: latlng,
//         mapTypeId: window.google.maps.MapTypeId.ROADMAP,
//       }
//       this.map = new window.google.maps.Map(
//         document.getElementById('mapa'),
//         options,
//       )

//       this.geocoder = new window.google.maps.Geocoder()
//       const svgMarker = {
//         path: mdiMapMarker,
//         fillColor: 'red',
//         fillOpacity: 0.8,
//         strokeWeight: 0,
//         rotation: 0,
//         scale: 2,
//         anchor: new window.google.maps.Point(12.3, 23),

//         draggable: true,
//       }
//       this.marker = new window.google.maps.Marker({
//         map: this.map,
//         icon: svgMarker,
//         draggable: true,
//       })
//       this.marker.setPosition(latlng)

//       window.google.maps.event.addListener(this.marker, 'dragend', () => {
//         this.latitude = this.marker.getPosition().lat()
//         this.longitude = this.marker.getPosition().lng()
//         this.$emit('input', {
//           ...this.value,
//           ...{
//             latitude: this.marker.getPosition().lat().toString(),
//             longitude: this.marker.getPosition().lng().toString(),
//           },
//         })
//       })
//     },

//     carregarEnderecoNoMapaDelay: debounce(function () {
//       this.carregarEnderecoNoMapa()
//     }, 600),
//     carregarEnderecoNoMapa() {
//       if (!this.enderecoCmp) {
//         this.enderecoCmp = this.$format.endereco(this.configuracoes)
//       }
//       this.geocoder.geocode(
//         { address: this.enderecoCmp + ', Brasil', region: 'BR' },
//         (results, status) => {
//           if (status === window.google.maps.GeocoderStatus.OK) {
//             if (results.length) {
//               const result = results[0]
//               this.latitude = result.geometry.location.lat()
//               this.longitude = result.geometry.location.lng()
//               this.enderecoCmp = result.formatted_address
//               this.setMapPosition(this.latitude, this.longitude)
//               this.$emit('input', {
//                 ...this.value,
//                 ...{
//                   latitude: result.geometry.location.lat().toString(),
//                   longitude: result.geometry.location.lng().toString(),
//                 },
//               })
//             }
//           }
//         },
//       )
//     },

//     setMapPosition(lat = 0, long = 0) {
//       const location = new window.google.maps.LatLng(lat, long)
//       this.map.setCenter?.(location)
//       this.map.setZoom?.(14)
//       this.marker.setPosition?.(location)
//     },
//       Servia para pegar a localização atual, mas essa localização é extremamente imprecisa em computadores 
//     getCurrentPosition(options) {
//       return new Promise(function (resolve, reject) {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(resolve, reject, options)
//         } else {
//           reject(new Error('No geolocation on browser'))
//         }
//       })
//     }, 
//   },
// }
</script>

<style></style>
