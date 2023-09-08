<template>
    <v-container>
        <v-row class="header" justify="center">
      <v-col cols="12">
        <h2>Contact US</h2>
        <hr class="solid-divider"> <!-- Add a class for styling -->
      </v-col>
    </v-row>

    <div class="contact-container">
      <v-row>
        <!-- Left side: Contact Form -->
        <v-col cols="12" sm="6">
          <div class="">
            <h2 style="text-align: center;">Contact Us</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
              </div>
              <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="message" rows="4" required></textarea>
              </div>
              <v-btn block rounded="xl" size="x-large" color="#B9B4B3">Send Message</v-btn>
            </form>
          </div>
        </v-col>
        <!-- Right side: Map Location (Replace with your map embed code) -->
        <v-col cols="12" sm="6">
          <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25441.62804990392!2d9.769849599242649!3d37.147860274837875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e32378871b008b%3A0x45bf61290d1970c4!2sMenzel%20Bourguiba!5e0!3m2!1sfr!2stn!4v1694105241653!5m2!1sfr!2stn" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </v-col>
      </v-row>
      
  
      
    </div>
    <v-row class="contacts" justify="center">
      <v-col cols="12">
        <p>You can join us on</p>
        <div class="social-links">
          <a href="https://www.facebook.com/moemeeeen" target="_blank" class="social-link">
            <v-icon class="fa"><i class="fab fa-facebook"></i></v-icon>
            Facebook
          </a>
          <a href="https://www.instagram.com/moemeeen/" target="_blank" class="social-link">
            <v-icon class="fa"><i class="fab fa-instagram"></i></v-icon>
            Instagram
          </a>
          <a href="https://github.com/moementrabelsi" target="_blank" class="social-link">
            <v-icon class="fa"><i class="fab fa-github"></i></v-icon>
            Github
          </a>
        </div>
      </v-col>
    </v-row>
</v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: '',
      };
    },
    methods: {
      submitForm() {
        // Handle form submission logic here
        console.log('Form submitted with data:', {
          name: this.name,
          email: this.email,
          message: this.message,
        });
        // You can add code to send the form data to your server or perform other actions.
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom CSS styles here */

  
  .contact-form {
    width: 48%;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .contact-form h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  button.submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .map-container {
    height: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  .header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}
.solid-divider {
  border-top: 1px solid #000; /* Adjust the width and color as needed */
  width: 30%; /* Adjust the width as needed */
  margin: 16px auto; /* Center the divider and add some spacing */
}

.contacts{
    padding: 30px;
    font-size: 20px;
    text-align: center;
  background: white;
}

.social-link {
  margin-right: 10px;
  color:#007bff /* Adjust as needed */
}
  </style>
  