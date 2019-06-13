var app = new Vue({
    el: '#generator',
    data: {
      items: [
      ],
    },
    created() {
      this.getItems();
    },
    methods: {
      async getItems() {
        try {
          let response = await axios.get("/api");
          this.items = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    }
  });