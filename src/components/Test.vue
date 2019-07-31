<template>
    <pre>
        <code>
            {{ data }}
        </code>
    </pre>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    data() {
        return {
            data: {},
        }
    },
    async mounted() {
        const beatmap = await axios.get('/getBeatmap');
        console.log(beatmap.data);
        this.data = beatmap.data;
    }
});
</script>

<style>

</style>
