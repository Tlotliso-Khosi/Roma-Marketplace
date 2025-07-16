<script type="module">
  // Import necessary Firebase services
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDr21aYKNBs1wkp9egIXeFgngjX3GNiQRc",
    authDomain: "nul-marketplace.firebaseapp.com",
    projectId: "nul-marketplace",
    storageBucket: "nul-marketplace.firebasestorage.app",
    messagingSenderId: "166796812147",
    appId: "1:166796812147:web:1f6ba41df67cc2e8146f06",
    measurementId: "G-WCGCK3BWD0"
  };

  // Initialize Firebase services
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // Initialize Analytics only if needed
  // const analytics = getAnalytics(app);
</script>