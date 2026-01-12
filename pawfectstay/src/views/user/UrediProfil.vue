<script>
import axios from "axios";

export default {
  name: "UrediProfil",

  data() {
    return {
      dog: null,
      successMessage: ""
    };
  },

  async mounted() {
    const dogId = this.$route.params.id;

    try {
      const res = await axios.get(`http://localhost:3000/dogs/${dogId}`);
      this.dog = res.data;
    } catch {
      alert("Pas nije pronađen");
    }
  },

  methods: {
    async updateDog() {
      try {
        await axios.put(`http://localhost:3000/dogs/${this.dog._id}`, {
          name: this.dog.name,
          breed: this.dog.breed,
          age: this.dog.age
        });

        this.successMessage = "Profil psa je uspješno ažuriran!";

        setTimeout(() => {
          this.$router.push("/home");
        }, 2500);
      } catch {
        alert("Greška pri spremanju promjena");
      }
    }
  }
};
</script>


<style scoped>
    .edit-container {
        max-width: 420px;
        margin: auto;
        padding: 20px;
        font-family: "Poppins", sans-serif;
    }

    .back-btn {
        background: none;
        border: none;
        font-size: 16px;
        color: #1d1b54;
        cursor: pointer;
        margin-bottom: 10px;
    }

    h1 {
        text-align: center;
        color: #1d1b54;
        margin-bottom: 20px;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
    }

    label {
        font-weight: 600;
        margin-top: 10px;
        color: #1d1b54;
    }

    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    button {
        background-color: #4a90e2;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 10px;
        margin-top: 20px;
        cursor: pointer;
    }

    button:hover {
        background-color: #1d1b54;
    }

    .success {
        margin-top: 20px;
        color: green;
        font-weight: bold;
        text-align: center;
    }
</style>