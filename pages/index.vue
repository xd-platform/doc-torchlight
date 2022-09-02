<script>
export default {
  asyncData({ redirect }) {
    redirect("/inventory");
  },
  render(h) {
    return h("div");
  },
};
</script>