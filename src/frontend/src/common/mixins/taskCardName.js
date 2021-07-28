export default {
  computed: {
    $taskCardDate() {
      return `# ${this.task ? this.task.id : '*' } создана ${this.timeAgo}`;
    }
  }
};
