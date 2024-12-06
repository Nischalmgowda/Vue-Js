const app = Vue.createApp({
    data() {
      return {
        reviews: []
      }
    },
    methods: {
      addReview(review) {
        this.reviews.push(review); 
      }
    }
  });
  
  app.component('review-form', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
  
        
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
  
       
        <label for="review">Review:</label>
        <textarea id="review" v-model="text"></textarea>
        <span v-if="errors.text" class="error">{{ errors.text }}</span>
  
        
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option disabled value="">Select a rating</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>


        <span v-if="errors.rating" class="error">{{ errors.rating }}</span>
  
        <input class="button" type="submit" value="Submit">  
      </form>
    `,
    data() {
      return {
        name: '',
        text: '',
        rating: null,
        errors: {} 
      };
    },
    methods: {
      onSubmit() {
       
        this.errors = {};
  
       
        if (!this.name) {
          this.errors.name = 'Name is required.';
        } else if (this.name.length < 3) {
          this.errors.name = 'Name must be at least 3 characters long.';
        }
  
        
        if (!this.text) {
          this.errors.text = 'Review text is required.';
        } else if (this.text.length < 4) {
          this.errors.text = 'Review must be at least 4 characters long.';
        }
  
       
        if (!this.rating) {
          this.errors.rating = 'Please select a rating.';
        } else if (this.rating < 1 || this.rating > 5) {
          this.errors.rating = 'Rating must be between 1 and 5.';
        }
  
        
        if (Object.keys(this.errors).length > 0) {
          
          return;
        }
  
        
        const review = {
          name: this.name,
          text: this.text,
          rating: this.rating
        };
  
       
        this.$emit('review-submitted', review);
  
  
        this.name = '';
        this.text = '';
        this.rating = null;
      }
    }
  });
  

  app.component('review-list', {
    template:
      /*html*/
      `
      <div v-if="reviews.length" class="review-container">
        <h3>Reviews:</h3>
        <ul>
          <li v-for="(review, index) in reviews" :key="index">
            {{ review.name }} gave this {{ review.rating }} stars
            <br/>
            and review is "{{ review.text }}"
          </li>
        </ul>
      </div>
    `,
    props: {
      reviews: {
        type: Array,
        required: true
      }
    }
  });
  

  app.mount('#app');
  