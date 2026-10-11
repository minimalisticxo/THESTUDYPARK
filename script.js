
document.addEventListener("DOMContentLoaded", () => {
  // Loading screen
  const loader = document.getElementById("loader");

  const hideLoader = () => loader?.classList.add("hidden");

  if (document.readyState === "complete") {
    window.setTimeout(hideLoader, 450);
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(hideLoader, 450);
    }, { once: true });
  }

  window.setTimeout(hideLoader, 3000);

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  function closeMenu() {
    navigation?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navigation?.classList.toggle("open") ?? false;
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      navigation?.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Campus tour details
  const tourData = [
    {
      id: "building",
      title: "Our School Building",
      category: "THE CAMPUS",
      description: "The school building is the setting for students' everyday educational journey. It brings together the spaces where school life, learning and student activities take place.",
      facts: ["THE STUDY PARK", "Kolkata"]
    },
    {
      id: "gate",
      title: "The School Gate",
      category: "FIRST IMPRESSIONS",
      description: "The school entrance marks the beginning of each school day. It welcomes students into the school environment and provides a familiar point of arrival for the school community.",
      facts: ["School entrance", "Paharpur Road"]
    },
    {
      id: "office",
      title: "School Office",
      category: "SCHOOL ADMINISTRATION",
      description: "The school office is an important point of contact for school-related enquiries. Families can contact the school directly for information about visits, administration and other questions.",
      facts: ["School enquiries", "Contact the school"]
    },
    {
      id: "office-inside",
      title: "Inside the Office",
      category: "SUPPORT AND GUIDANCE",
      description: "Explore the office area through this photograph. For specific information about office facilities or staff responsibilities, please contact the school.",
      facts: ["School administration", "Enquiries welcome"]
    },
    {
      id: "assembly",
      title: "Assembly",
      category: "SCHOOL COMMUNITY",
      description: "School assembly areas can bring students together as part of the school day. This view introduces a shared space within the school community.",
      facts: ["School life", "Shared space"]
    },
    {
      id: "corridor",
      title: "Our Corridors",
      category: "AROUND THE SCHOOL",
      description: "Corridors connect different areas of a school and form part of the everyday journey between classrooms and other school spaces.",
      facts: ["Campus spaces", "Everyday school life"]
    },
    {
      id: "classroom",
      title: "Our Classrooms",
      category: "WHERE LEARNING HAPPENS",
      description: "Classrooms are central to students' daily learning. They provide a place for lessons, discussion, practice and the development of new skills.",
      facts: ["KG 1 to Class 12", "Learning environment"]
    }
  ];

  const overlay = document.getElementById("tourOverlay");
  const closeButton = document.getElementById("tourClose");
  const tourImage = document.getElementById("tourImage");
  const tourCategory = document.getElementById("tourCategory");
  const tourCounter = document.getElementById("tourCounter");
  const tourTitle = document.getElementById("tourTitle");
  const tourDescription = document.getElementById("tourDescription");
  const tourFacts = document.getElementById("tourFacts");
  const tourPrev = document.getElementById("tourPrev");
  const tourNext = document.getElementById("tourNext");

  let currentIndex = 0;
  let previouslyFocused = null;

  function showTourItem(index) {
    currentIndex = (index + tourData.length) % tourData.length;
    const item = tourData[currentIndex];
    const card = document.querySelector(`[data-tour="${item.id}"]`);
    const cardImage = card?.querySelector("img");

    if (tourImage) {
      tourImage.src = cardImage?.getAttribute("src") || "";
      tourImage.alt = cardImage?.getAttribute("alt") || item.title;
    }

    if (tourCategory) tourCategory.textContent = item.category;

    if (tourCounter) {
      tourCounter.textContent =
        `CAMPUS TOUR · ${String(currentIndex + 1).padStart(2, "0")} / ${String(tourData.length).padStart(2, "0")}`;
    }

    if (tourTitle) tourTitle.textContent = item.title;
    if (tourDescription) tourDescription.textContent = item.description;

    if (tourFacts) {
      tourFacts.replaceChildren();

      item.facts.forEach((fact) => {
        const chip = document.createElement("span");
        chip.className = "tour-fact";
        chip.textContent = fact;
        tourFacts.appendChild(chip);
      });
    }

    if (tourNext) {
      tourNext.textContent =
        currentIndex === tourData.length - 1 ? "Back to start ↻" : "Next →";
    }
  }

  function openTour(id) {
    const index = tourData.findIndex((item) => item.id === id);
    if (index < 0 || !overlay) return;

    previouslyFocused = document.activeElement;
    showTourItem(index);
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton?.focus();
  }

  function closeTour() {
    if (!overlay) return;

    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus();
    }
  }

  document.querySelectorAll("[data-tour]").forEach((card) => {
    card.addEventListener("click", () => {
      openTour(card.getAttribute("data-tour"));
    });
  });

  closeButton?.addEventListener("click", closeTour);
  tourPrev?.addEventListener("click", () => showTourItem(currentIndex - 1));
  tourNext?.addEventListener("click", () => showTourItem(currentIndex + 1));

  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) closeTour();
  });

  // Gallery lightbox
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("galleryLightboxImage");
  const lightboxCaption = document.getElementById("galleryLightboxCaption");
  const lightboxClose = document.getElementById("galleryLightboxClose");

  function closeLightbox() {
    lightbox?.classList.remove("active");
    lightbox?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll("[data-gallery]").forEach((tile) => {
    tile.addEventListener("click", () => {
      const src = tile.getAttribute("data-gallery");
      const caption = tile.getAttribute("data-caption") || "School gallery";

      if (!src || !lightbox || !lightboxImage || !lightboxCaption) return;

      lightboxImage.src = src;
      lightboxImage.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      lightboxClose?.focus();
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (overlay?.classList.contains("active")) {
      if (event.key === "Escape") closeTour();
      if (event.key === "ArrowRight") showTourItem(currentIndex + 1);
      if (event.key === "ArrowLeft") showTourItem(currentIndex - 1);
    }

    if (lightbox?.classList.contains("active") && event.key === "Escape") {
      closeLightbox();
    }
  });
});
