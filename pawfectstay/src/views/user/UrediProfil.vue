<template>
    <div class="edit-container">

        <button class="back-btn" @click="$router.push('/home')">← Natrag</button>

        <h1>Uredi profil psa</h1>

        <div v-if="!dog">
            <p>Nema spremljenih profila psa.</p>
        </div>

        <form v-else class="edit-form" @submit.prevent="updateDog">

            <label for="name">Ime psa:</label>
            <input id="name" type="text" v-model="dog.name" required />

            <label for="breed">Vrsta psa:</label>
            <input id="breed" type="text" v-model="dog.breed" required />

            <label for="age">Starost psa:</label>
            <input id="age" type="number" v-model="dog.age" min="0" required />

            <button type="submit">Spremi promjene</button>
        </form>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>

    </div>
</template>

<script>
    export default {
        name: "UrediProfil",

        data() {
            return {
                dog: null,
                successMessage: "",
            };
        },

        mounted() {
            const savedDog = JSON.parse(localStorage.getItem("dogProfile"));
            if (savedDog) {
                this.dog = savedDog;
            }
        },

        methods: {
            updateDog() {
                localStorage.setItem("dogProfile", JSON.stringify(this.dog));
                this.successMessage = "Profil psa je uspješno ažuriran!";

                setTimeout(() => {
                    this.$router.push("/home");
                }, 2500);
            },
        },
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