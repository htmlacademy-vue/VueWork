export default {
  methods: {
    async $logout() {
      await this.$store.dispatch('Auth/logout');
      this.$notifier.success('Вы успешно вышли');
      await this.$router.push('/login');
    }
  }
};
