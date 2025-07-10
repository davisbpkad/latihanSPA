<template>
    <div class="container mt-4 pb-5">
            <Carousel />
            <Blogpost />
    </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import Blogpost from '../components/Blogpost.vue'
export default {
  name: 'HomeView',
  components: { Carousel, Blogpost }
}
</script> 