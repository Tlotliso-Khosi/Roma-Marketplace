document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle");

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme") || "dark";

  // Apply the saved theme on page load
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    updateThemeIcon("light");
  } else {
    document.body.classList.remove("light-theme");
    updateThemeIcon("dark");
  }

  // Toggle theme when the button is clicked
  if (themeToggle) {
    themeToggle.addEventListener("click", function (e) {
      e.preventDefault();

      if (document.body.classList.contains("light-theme")) {
        // Switch to dark theme
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
        updateThemeIcon("dark");
      } else {
        // Switch to light theme
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
        updateThemeIcon("light");
      }
    });
  }

  // Update the theme toggle icon based on current theme
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i");
    if (theme === "light") {
      icon.className = "fas fa-moon"; // Show moon icon for light theme (to switch to dark)
    } else {
      icon.className = "fas fa-sun"; // Show sun icon for dark theme (to switch to light)
    }
  }

  // User type selector for signup page
  const userTypeBtns = document.querySelectorAll(".user-type-btn");
  if (userTypeBtns.length > 0) {
    userTypeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        userTypeBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");
      });
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

  const header = document.querySelector("header .container");
  const nav = document.querySelector("nav");

  if (window.innerWidth <= 768 && header && nav) {
    header.insertBefore(mobileMenuBtn, nav);
    nav.classList.add("mobile-hidden");

    mobileMenuBtn.addEventListener("click", function () {
      nav.classList.toggle("mobile-hidden");

      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current FAQ item
      item.classList.toggle("active");
    });
  });

  // Map Button Functionality
  const mapBtn = document.querySelector(".map-btn");
  const mapOverlay = document.querySelector(".map-overlay");
  const mapPlaceholder = document.querySelector(".map-placeholder");

  if (mapBtn) {
    mapBtn.addEventListener("click", function () {
      // In a real implementation, you would replace the placeholder with an actual map
      // For this example, we'll just hide the overlay
      mapOverlay.style.display = "none";

      // Create a message indicating the map would load here
      const mapMessage = document.createElement("div");
      mapMessage.className = "map-message";
      mapMessage.textContent = "Map would load here in a real implementation";
      mapMessage.style.position = "absolute";
      mapMessage.style.top = "50%";
      mapMessage.style.left = "50%";
      mapMessage.style.transform = "translate(-50%, -50%)";
      mapMessage.style.color = "var(--text-color)";
      mapMessage.style.fontSize = "1.2rem";
      mapMessage.style.textAlign = "center";

      mapPlaceholder.appendChild(mapMessage);
    });
  }

  // Form Submission (for demonstration)
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // In a real implementation, you would send the form data to a server
      // For this example, we'll just show a success message

      const formData = new FormData(contactForm);
      let formValues = {};

      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }

      console.log("Form submitted with values:", formValues);

      // Create success message
      const successMessage = document.createElement("div");
      successMessage.className = "form-success";
      successMessage.textContent =
        "Thank you for your message! We will get back to you soon.";
      successMessage.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
      successMessage.style.color = "#4caf50";
      successMessage.style.padding = "15px";
      successMessage.style.borderRadius = "6px";
      successMessage.style.marginTop = "20px";
      successMessage.style.textAlign = "center";

      // Add success message to the form container
      contactForm.parentNode.appendChild(successMessage);

      // Reset the form
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize carousel functionality
  initCarousel();

  // Initialize view toggle
  initViewToggle();

  // Initialize filters
  initFilters();

  // Initialize user menu
  initUserMenu();

  // Initialize service card hover effects
  initServiceCards();
});

/**
 * Carousel Functionality
 */
function initCarousel() {
  const carousel = document.querySelector(".services-carousel");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");
  const dots = document.querySelectorAll(".carousel-dots .dot");

  if (!carousel || !prevBtn || !nextBtn) return;

  const cardWidth = carousel.querySelector(".service-card").offsetWidth + 20; // card width + gap
  const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
  const totalCards = carousel.querySelectorAll(".service-card").length;
  const maxScrollPosition = (totalCards - visibleCards) * cardWidth;

  let currentPosition = 0;
  let currentDotIndex = 0;

  // Update active dot
  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Scroll to position
  function scrollToPosition(position) {
    carousel.scrollTo({
      left: position,
      behavior: "smooth",
    });
  }

  // Previous button click
  prevBtn.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition -= cardWidth;
      currentDotIndex = Math.floor(currentPosition / (cardWidth * 3));
      scrollToPosition(currentPosition);
      updateDots(currentDotIndex);
    }
  });

  // Next button click
  nextBtn.addEventListener("click", () => {
    if (currentPosition < maxScrollPosition) {
      currentPosition += cardWidth;
      currentDotIndex = Math.floor(currentPosition / (cardWidth * 3));
      scrollToPosition(currentPosition);
      updateDots(currentDotIndex);
    }
  });

  // Dot click
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentDotIndex = index;
      currentPosition = index * cardWidth * 3; // 3 cards per view
      scrollToPosition(currentPosition);
      updateDots(currentDotIndex);
    });
  });

  // Handle carousel scroll event
  carousel.addEventListener("scroll", () => {
    const scrollPosition = carousel.scrollLeft;
    currentPosition = scrollPosition;
    currentDotIndex = Math.floor(scrollPosition / (cardWidth * 3));
    updateDots(currentDotIndex);
  });

  // Auto scroll every 5 seconds
  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (currentPosition < maxScrollPosition) {
        currentPosition += cardWidth;
        currentDotIndex = Math.floor(currentPosition / (cardWidth * 3));
      } else {
        currentPosition = 0;
        currentDotIndex = 0;
      }
      scrollToPosition(currentPosition);
      updateDots(currentDotIndex);
    }, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Start auto scroll
  startAutoScroll();

  // Stop auto scroll on hover
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);
}

/**
 * View Toggle Functionality
 */
function initViewToggle() {
  const viewButtons = document.querySelectorAll(".view-btn");
  const servicesGrid = document.querySelector(".services-grid");

  if (!viewButtons.length || !servicesGrid) return;

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      viewButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Get view type
      const viewType = button.getAttribute("data-view");

      // Update grid layout
      if (viewType === "list") {
        servicesGrid.classList.add("list-view");
        servicesGrid.classList.remove("grid-view");
      } else {
        servicesGrid.classList.add("grid-view");
        servicesGrid.classList.remove("list-view");
      }

      // Save preference to localStorage
      localStorage.setItem("servicesViewPreference", viewType);
    });
  });

  // Load saved preference
  const savedViewPreference = localStorage.getItem("servicesViewPreference");
  if (savedViewPreference) {
    const button = document.querySelector(
      `.view-btn[data-view="${savedViewPreference}"]`
    );
    if (button) button.click();
  }
}

/**
 * Filters Functionality
 */
function initFilters() {
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");
  const serviceCards = document.querySelectorAll(".service-category-card");

  if (!categoryFilter || !sortFilter) return;

  // Filter by category
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "all") {
      // Show all categories
      serviceCards.forEach((card) => {
        card.style.display = "block";
      });
    } else {
      // Show only selected category
      serviceCards.forEach((card) => {
        const cardCategory = card.querySelector("h3").textContent.toLowerCase();

        if (cardCategory.includes(selectedCategory)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });

  // Sort services
  sortFilter.addEventListener("change", () => {
    const selectedSort = sortFilter.value;
    const servicesContainer = document.querySelector(".services-grid");
    const serviceCardsArray = Array.from(serviceCards);

    // Sort cards based on selected option
    switch (selectedSort) {
      case "popular":
        // Sort by number of listings (descending)
        serviceCardsArray.sort((a, b) => {
          const aListings = parseInt(a.querySelector("p").textContent);
          const bListings = parseInt(b.querySelector("p").textContent);
          return bListings - aListings;
        });
        break;

      case "recent":
        // For demo purposes, we'll just randomize
        for (let i = serviceCardsArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [serviceCardsArray[i], serviceCardsArray[j]] = [
            serviceCardsArray[j],
            serviceCardsArray[i],
          ];
        }
        break;

      case "price-low":
        // In a real app, you'd sort by price
        // For demo, we'll sort alphabetically
        serviceCardsArray.sort((a, b) => {
          return a
            .querySelector("h3")
            .textContent.localeCompare(b.querySelector("h3").textContent);
        });
        break;

      case "price-high":
        // Reverse of price-low
        serviceCardsArray.sort((a, b) => {
          return b
            .querySelector("h3")
            .textContent.localeCompare(a.querySelector("h3").textContent);
        });
        break;

      case "rating":
        // For demo purposes, we'll just randomize
        for (let i = serviceCardsArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [serviceCardsArray[i], serviceCardsArray[j]] = [
            serviceCardsArray[j],
            serviceCardsArray[i],
          ];
        }
        break;
    }

    // Re-append sorted cards to container
    serviceCardsArray.forEach((card) => {
      servicesContainer.appendChild(card);
    });
  });
}

/**
 * User Menu Functionality
 */
function initUserMenu() {
  const userMenu = document.querySelector(".user-menu");

  if (!userMenu) return;

  // Create dropdown menu
  const dropdown = document.createElement("div");
  dropdown.className = "user-dropdown";
  dropdown.innerHTML = `
        <ul>
            <li><a href="profile.html"><i class="fas fa-user"></i> My Profile</a></li>
            <li><a href="settings.html"><i class="fas fa-cog"></i> Settings</a></li>
            <li><a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a></li>
            <li><a href="favorites.html"><i class="fas fa-heart"></i> Favorites</a></li>
            <li class="divider"></li>
            <li><a href="index.html"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
    `;

  // Style the dropdown
  dropdown.style.position = "absolute";
  dropdown.style.top = "100%";
  dropdown.style.right = "0";
  dropdown.style.backgroundColor = "var(--card-bg)";
  dropdown.style.borderRadius = "8px";
  dropdown.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  dropdown.style.width = "200px";
  dropdown.style.zIndex = "1000";
  dropdown.style.display = "none";
  dropdown.style.marginTop = "10px";

  // Style the dropdown list
  const style = document.createElement("style");
  style.textContent = `
        .user-dropdown ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .user-dropdown li {
            padding: 0;
        }
        
        .user-dropdown li a {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            color: var(--text-color);
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        
        .user-dropdown li a:hover {
            background-color: var(--card-hover);
        }
        
        .user-dropdown li a i {
            margin-right: 10px;
            width: 16px;
            color: var(--secondary-color);
        }
        
        .user-dropdown li.divider {
            height: 1px;
            background-color: var(--border-color);
            margin: 5px 0;
        }
    `;

  document.head.appendChild(style);

  // Add dropdown to user menu
  userMenu.style.position = "relative";
  userMenu.appendChild(dropdown);

  // Toggle dropdown on click
  userMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });
}

/**
 * Service Card Hover Effects
 */
function initServiceCards() {
  const serviceCards = document.querySelectorAll(
    ".service-card, .service-category-card"
  );

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });
  });
}

/**
 * Search Functionality
 */
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-box input");

  if (!searchInput) return;

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      // Get search query
      const query = searchInput.value.trim().toLowerCase();

      if (query) {
        // In a real app, you would redirect to search results page
        // For demo, we'll just log the search query
        console.log("Searching for:", query);

        // Show search feedback
        const searchFeedback = document.createElement("div");
        searchFeedback.className = "search-feedback";
        searchFeedback.textContent = `Searching for "${query}"...`;
        searchFeedback.style.position = "fixed";
        searchFeedback.style.top = "80px";
        searchFeedback.style.left = "50%";
        searchFeedback.style.transform = "translateX(-50%)";
        searchFeedback.style.backgroundColor = "var(--secondary-color)";
        searchFeedback.style.color = "white";
        searchFeedback.style.padding = "10px 20px";
        searchFeedback.style.borderRadius = "20px";
        searchFeedback.style.zIndex = "1000";

        document.body.appendChild(searchFeedback);

        // Remove feedback after 3 seconds
        setTimeout(() => {
          searchFeedback.remove();
        }, 3000);

        // Filter visible services based on search query
        filterServicesBySearch(query);
      }
    }
  });
});

/**
 * Filter services based on search query
 */
function filterServicesBySearch(query) {
  const serviceCategories = document.querySelectorAll(".service-category-card");
  const serviceCards = document.querySelectorAll(".service-card");
  let matchFound = false;

  // Filter service categories
  serviceCategories.forEach((category) => {
    const categoryName = category.querySelector("h3").textContent.toLowerCase();
    const servicesList = category.querySelectorAll(".category-services li");
    let categoryMatch = categoryName.includes(query);

    // Check services within category
    servicesList.forEach((service) => {
      if (service.textContent.toLowerCase().includes(query)) {
        categoryMatch = true;
      }
    });

    if (categoryMatch) {
      category.style.display = "block";
      category.style.order = "-1"; // Move matches to the top
      matchFound = true;
    } else {
      category.style.opacity = "0.5";
    }
  });

  // Filter individual service cards
  serviceCards.forEach((card) => {
    const cardTitle = card.querySelector("h3").textContent.toLowerCase();
    const cardDescription =
      card.querySelector(".service-description")?.textContent.toLowerCase() ||
      "";

    if (cardTitle.includes(query) || cardDescription.includes(query)) {
      card.style.display = "block";
      card.style.order = "-1"; // Move matches to the top
      matchFound = true;
    } else {
      card.style.opacity = "0.5";
    }
  });

  // Show message if no matches found
  if (!matchFound) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                <h3>No services found for "${query}"</h3>
                <p>Try different keywords or browse our categories below.</p>
                <button class="btn primary-btn reset-search" style="margin-top: 20px;">Reset Search</button>
            </div>
        `;

    // Insert before the services grid
    const servicesGrid = document.querySelector(".services-grid");
    servicesGrid.parentNode.insertBefore(noResults, servicesGrid);

    // Add event listener to reset button
    noResults.querySelector(".reset-search").addEventListener("click", () => {
      resetSearch();
      noResults.remove();
    });
  }
}

/**
 * Reset search results
 */
function resetSearch() {
  const serviceCategories = document.querySelectorAll(".service-category-card");
  const serviceCards = document.querySelectorAll(".service-card");
  const searchInput = document.querySelector(".search-box input");

  // Reset service categories
  serviceCategories.forEach((category) => {
    category.style.display = "block";
    category.style.opacity = "1";
    category.style.order = "0";
  });

  // Reset service cards
  serviceCards.forEach((card) => {
    card.style.display = "block";
    card.style.opacity = "1";
    card.style.order = "0";
  });

  // Clear search input
  if (searchInput) {
    searchInput.value = "";
  }

  // Remove any no results message
  const noResults = document.querySelector(".no-results");
  if (noResults) {
    noResults.remove();
  }
}

// Orders Page Functionality
function initOrdersPage() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const orderCards = document.querySelectorAll(".order-card");
  const searchInput = document.querySelector(".search-orders input");

  // Tab filtering
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      orderCards.forEach((card) => {
        card.style.display =
          filter === "all" || card.classList.contains(filter)
            ? "block"
            : "none";
      });
    });
  });

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    orderCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "block" : "none";
    });
  });
}

// Favorites Page Functionality
function initFavoritesPage() {
  const removeButtons = document.querySelectorAll(".remove-favorite");
  const emptyState = document.querySelector(".empty-favorites");
  const favoritesGrid = document.querySelector(".favorites-grid");

  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const favoriteItem = btn.closest(".favorite-item");
      favoriteItem.remove();
      checkEmptyState();
    });
  });

  function checkEmptyState() {
    const hasFavorites = document.querySelectorAll(".favorite-item").length > 0;
    emptyState.style.display = hasFavorites ? "none" : "flex";
    favoritesGrid.style.display = hasFavorites ? "grid" : "block";
  }

  checkEmptyState();
}

// Profile Page Functionality
function initProfilePage() {
  const editBtn = document.querySelector(".edit-btn");
  const avatarInput = document.createElement("input");
  avatarInput.type = "file";
  avatarInput.accept = "image/*";
  avatarInput.style.display = "none";

  // Avatar upload
  document.querySelector(".change-avatar").addEventListener("click", () => {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.querySelector(".avatar img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Edit profile
  editBtn.addEventListener("click", () => {
    const fields = document.querySelectorAll(".info-list dd");
    fields.forEach((field) => {
      const currentValue = field.textContent;
      field.innerHTML = `<input type="text" value="${currentValue}">`;
    });

    editBtn.innerHTML = '<i class="fas fa-save"></i> Save';
    editBtn.removeEventListener("click", arguments.callee);
    editBtn.addEventListener("click", saveProfile);
  });

  function saveProfile() {
    // In real implementation, send data to server
    const inputs = document.querySelectorAll(".info-list input");
    inputs.forEach((input) => {
      input.parentElement.innerHTML = input.value;
    });

    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editBtn.removeEventListener("click", saveProfile);
    editBtn.addEventListener("click", initProfilePage);
  }
}

// Initialize page-specific scripts
document.addEventListener("DOMContentLoaded", function () {
  // Check current page and initialize appropriate scripts
  if (document.querySelector(".user-orders")) initOrdersPage();
  if (document.querySelector(".user-favorites")) initFavoritesPage();
  if (document.querySelector(".user-profile")) initProfilePage();
});

// Messages Page Functionality
// Update the initMessagesPage function in script.js
function initMessagesPage() {
  const sendBtn = document.querySelector(".send-btn");
  const messageInput = document.querySelector(".message-input textarea");
  const chatMessages = document.querySelector(".chat-messages");
  const conversationItems = document.querySelectorAll(".conversation-item");
  let activeConversationId = null;

  // Mock conversation data
  const conversations = {
    conv1: {
      name: "Math Wizards",
      messages: [
        {
          type: "received",
          text: "Hi! Are you available for a calculus session tomorrow?",
          time: "14:32",
        },
        { type: "sent", text: "Yes, I'm available at 2 PM", time: "14:35" },
      ],
    },
    conv2: {
      name: "Code Masters",
      messages: [
        {
          type: "received",
          text: "Need help with Python project!",
          time: "10:15",
        },
      ],
    },
  };

  // Typing indicator functions
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  function hideTypingIndicator(indicator) {
    indicator.remove();
  }

  // Add message to DOM
  function renderMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${message.type}`;
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${message.text}</p>
      </div>
      <div class="message-time">${message.time}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Simulate received message
  function simulateResponse(conversationId) {
    const typing = showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator(typing);

      const responses = [
        "Sounds good! See you then.",
        "Can we reschedule to 3 PM?",
        "I'll prepare the materials.",
        "Great! Let's meet at the library.",
      ];

      const newMessage = {
        type: "received",
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      conversations[conversationId].messages.push(newMessage);
      renderMessage(newMessage);
    }, 2000);
  }

  // Send message functionality
  function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const newMessage = {
      type: "sent",
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add to current conversation
    conversations[activeConversationId].messages.push(newMessage);
    renderMessage(newMessage);
    messageInput.value = "";

    // Simulate response after delay
    setTimeout(() => simulateResponse(activeConversationId), 1000);
  }

  // Load conversation messages
  function loadConversation(conversationId) {
    activeConversationId = conversationId;
    chatMessages.innerHTML = "";
    conversations[conversationId].messages.forEach(renderMessage);
    document.querySelector(".chat-header h3").textContent =
      conversations[conversationId].name;
  }

  // Initialize conversations
  conversationItems.forEach((item, index) => {
    const convId = `conv${index + 1}`;
    item.dataset.conversationId = convId;

    if (item.classList.contains("active")) {
      activeConversationId = convId;
      loadConversation(convId);
    }

    item.addEventListener("click", () => {
      conversationItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      loadConversation(convId);
    });
  });

  // Event listeners
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// Initialize messages page
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".messages-section")) {
    initMessagesPage();
  }
});
