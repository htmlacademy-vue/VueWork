<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from '@/common/constants';

export default {
  name: 'AppDrop',
  methods: {
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData =
            JSON.parse(dataTransfer.getData(DATA_TRANSFER_PAYLOAD));
        this.$emit('drop', transferData);
      }
    }
  }
};
</script>
